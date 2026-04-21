from __future__ import annotations

from io import BytesIO
from pathlib import Path
from typing import Annotated, Any

import numpy as np
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.models import load_model

try:
    from backend.labels import LABELS, LABEL_FULL_NAMES
except ModuleNotFoundError:
    from labels import LABELS, LABEL_FULL_NAMES

ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp"}
DEFAULT_INPUT_SIZE = (224, 224)

PROJECT_ROOT = Path(__file__).resolve().parents[1]
MODEL_RELATIVE_PATH = Path("models") / "MobileNetV2_best.h5"
MODEL_PATH = PROJECT_ROOT / MODEL_RELATIVE_PATH

if not MODEL_PATH.exists():
    raise RuntimeError(
        f"Model tidak ditemukan di path wajib: {MODEL_RELATIVE_PATH.as_posix()} "
        f"(resolved: {MODEL_PATH})"
    )

try:
    MODEL = load_model(str(MODEL_PATH), compile=False)
except Exception as exc:  # pragma: no cover
    raise RuntimeError(f"Gagal load model dari {MODEL_PATH}: {exc}") from exc


def _resolve_input_size() -> tuple[int, int]:
    model_input_shape = getattr(MODEL, "input_shape", None)

    if (
        isinstance(model_input_shape, tuple)
        and len(model_input_shape) == 4
        and isinstance(model_input_shape[1], int)
        and isinstance(model_input_shape[2], int)
    ):
        return (model_input_shape[1], model_input_shape[2])

    return DEFAULT_INPUT_SIZE


INPUT_SIZE = _resolve_input_size()


app = FastAPI(title="NilaCare Local Inference API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://nila-care-neifj1eur-akhfabgss-projects.vercel.app",
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _looks_like_probabilities(scores: np.ndarray) -> bool:
    if scores.ndim != 1:
        return False

    if np.any(scores < 0.0) or np.any(scores > 1.0):
        return False

    return abs(float(np.sum(scores)) - 1.0) < 1e-3


def _softmax(logits: np.ndarray) -> np.ndarray:
    shifted = logits - np.max(logits)
    exp_scores = np.exp(shifted)
    denom = np.sum(exp_scores)
    if denom == 0:
        return exp_scores
    return exp_scores / denom


def _preprocess_image(image_bytes: bytes) -> np.ndarray:
    with Image.open(BytesIO(image_bytes)) as image:
        rgb_image = image.convert("RGB")
        resized = rgb_image.resize(INPUT_SIZE)
        image_array = np.asarray(resized, dtype=np.float32)

    normalized = preprocess_input(image_array)
    batched = np.expand_dims(normalized, axis=0)
    return batched


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post(
    "/predict",
    responses={
        400: {"description": "Bad Request"},
        500: {"description": "Internal Server Error"},
    },
)
async def predict(file: Annotated[UploadFile, File(...)]) -> dict[str, Any]:
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Format file tidak didukung. Gunakan JPEG, PNG, atau WEBP.",
        )

    try:
        image_bytes = await file.read()
        input_tensor = _preprocess_image(image_bytes)
    except Exception:
        raise HTTPException(status_code=400, detail="File gambar tidak valid.")

    try:
        raw_output = MODEL.predict(input_tensor, verbose=0)
        scores = np.asarray(raw_output, dtype=np.float32)

        if scores.ndim == 2 and scores.shape[0] == 1:
            scores = scores[0]

        if scores.ndim != 1:
            raise ValueError("Bentuk output model tidak didukung.")

        probabilities = scores if _looks_like_probabilities(scores) else _softmax(scores)

        top_index = int(np.argmax(probabilities))
        confidence = float(probabilities[top_index])
        label_code = LABELS[top_index] if top_index < len(LABELS) else f"Unknown_{top_index}"
        label = LABEL_FULL_NAMES.get(label_code, label_code)

        return {
            "label": label,
            "confidence": confidence,
        }
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Gagal melakukan inferensi model.")
