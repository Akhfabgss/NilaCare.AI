import { GoogleGenerativeAI, type Part } from "@google/generative-ai";
import { NextResponse } from "next/server";

type ChatRequestBody = {
  message?: unknown;
  context?: unknown;
  imageBase64?: unknown;
  imageMimeType?: unknown;
  prediction?: unknown;
};

type PredictionPayload = {
  label: string;
  confidence: number;
};

const MAX_MESSAGE_LENGTH = 500;
const CANDIDATE_MODELS = [
  "gemini-2.5-flash",
  "models/gemini-2.5-flash",
];

const SYSTEM_INSTRUCTION = `Anda adalah asisten NilaCare.AI.
Fokus hanya pada kesehatan ikan nila: gejala, pencegahan, penanganan awal, dan saran umum non-diagnosis.
Jawab dalam Bahasa Indonesia yang ringkas, jelas, dan actionable.
Jangan mengklaim diagnosis pasti.
Jika topik di luar kesehatan ikan nila, arahkan pengguna kembali ke topik kesehatan ikan nila.`;

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function toContext(value: unknown): Record<string, unknown> | undefined {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return undefined;
}

function toPrediction(value: unknown): PredictionPayload | undefined {
  if (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    "label" in value &&
    "confidence" in value &&
    typeof (value as Record<string, unknown>).label === "string" &&
    typeof (value as Record<string, unknown>).confidence === "number"
  ) {
    return {
      label: (value as Record<string, unknown>).label as string,
      confidence: (value as Record<string, unknown>).confidence as number,
    };
  }

  return undefined;
}

function buildUserPromptText(message: string): string {
  return `${SYSTEM_INSTRUCTION}\n\nPertanyaan pengguna: ${message}\n\nJawaban:`;
}

function buildPredictionHintText(
  prediction: PredictionPayload
): string {
  const confidencePct = (prediction.confidence * 100).toFixed(1);
  return (
    `Hasil prediksi model ML: ${prediction.label} (confidence ${confidencePct}%).` +
    ` Gunakan ini sebagai petunjuk dan jelaskan kondisi/penyakit yang terdeteksi pada gambar tersebut.`
  );
}

function buildParts(
  message: string,
  imageBase64: string | null,
  imageMimeType: string | null,
  prediction: PredictionPayload | undefined
): Part[] {
  const parts: Part[] = [];

  // 1. Prediction hint (if available) — placed first so Gemini treats it as context
  if (prediction) {
    parts.push({ text: buildPredictionHintText(prediction) });
  }

  // 2. User message (with system instruction embedded)
  parts.push({ text: buildUserPromptText(message) });

  // 3. Inline image (if available)
  if (imageBase64 && imageMimeType && ALLOWED_MIME_TYPES.has(imageMimeType)) {
    parts.push({ inlineData: { mimeType: imageMimeType, data: imageBase64 } });
  }

  return parts;
}

async function generateReplyWithFallback(apiKey: string, parts: Part[]): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);

  for (const modelName of CANDIDATE_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent({ contents: [{ role: "user", parts }] });
      const response = await Promise.resolve(result.response);
      const textResult = response.text();
      const text =
        typeof textResult === "string" ? textResult : await Promise.resolve(textResult);

      if (typeof text === "string" && text.trim()) {
        return text.trim();
      }
    } catch (modelError) {
      const messageFromError =
        modelError instanceof Error ? modelError.message : "Unknown provider error";
      console.error(messageFromError);
    }
  }

  return "";
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfiguration: missing GEMINI_API_KEY" },
      { status: 500 }
    );
  }

  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: "Body JSON tidak valid." }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ error: "`message` wajib diisi." }, { status: 400 });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "`message` maksimal 500 karakter." },
      { status: 400 }
    );
  }

  const context = toContext(body.context);
  void context; // kept for backward-compat; prediction supersedes it

  const imageBase64 =
    typeof body.imageBase64 === "string" && body.imageBase64.length > 0
      ? body.imageBase64
      : null;

  const imageMimeType =
    typeof body.imageMimeType === "string" && ALLOWED_MIME_TYPES.has(body.imageMimeType)
      ? body.imageMimeType
      : null;

  const prediction = toPrediction(body.prediction);

  const parts = buildParts(message, imageBase64, imageMimeType, prediction);

  try {
    const reply = await generateReplyWithFallback(apiKey, parts);

    if (!reply) {
      return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
    }

    return NextResponse.json({ reply }, { status: 200 });
  } catch (error) {
    const messageFromError = error instanceof Error ? error.message : "Unknown internal error";
    console.error(messageFromError);
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
