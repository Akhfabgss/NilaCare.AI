export type PredictResponse = {
  label: string;
  confidence: number;
};

const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;
const PREDICT_URL = `${API_BASE_URL.replace(/\/+$/, "")}/predict`;

export async function predictDisease(file: File): Promise<PredictResponse> {
  const formData = new FormData();
  formData.append("file", file);

  let response: Response;
  try {
    response = await fetch(PREDICT_URL, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error(
      "Backend tidak dapat dijangkau. Jalankan FastAPI di http://127.0.0.1:8000 lalu coba lagi."
    );
  }

  let responseBody: unknown = null;
  try {
    responseBody = await response.json();
  } catch {
    responseBody = null;
  }

  if (!response.ok) {
    const detail =
      typeof responseBody === "object" &&
      responseBody !== null &&
      "detail" in responseBody &&
      typeof responseBody.detail === "string"
        ? responseBody.detail
        : "Gagal memproses prediksi.";

    throw new Error(`Request prediksi gagal (${response.status}): ${detail}`);
  }

  if (
    typeof responseBody !== "object" ||
    responseBody === null ||
    !("label" in responseBody) ||
    !("confidence" in responseBody) ||
    typeof responseBody.label !== "string" ||
    typeof responseBody.confidence !== "number"
  ) {
    throw new Error("Format respons backend tidak valid.");
  }

  return {
    label: responseBody.label,
    confidence: responseBody.confidence,
  };
}
