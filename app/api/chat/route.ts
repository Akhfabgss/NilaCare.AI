import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

type ChatRequestBody = {
  message?: unknown;
  context?: unknown;
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

function toContext(value: unknown): Record<string, unknown> | undefined {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return undefined;
}

function buildPrompt(message: string, context?: Record<string, unknown>): string {
  const contextBlock = context
    ? `Konteks tambahan (opsional):\n${JSON.stringify(context)}`
    : "Konteks tambahan (opsional): -";

  return `${SYSTEM_INSTRUCTION}\n\n${contextBlock}\n\nPertanyaan pengguna: ${message}\n\nJawaban:`;
}

async function generateReplyWithFallback(apiKey: string, prompt: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);

  for (const modelName of CANDIDATE_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
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
  const prompt = buildPrompt(message, context);

  try {
    const reply = await generateReplyWithFallback(apiKey, prompt);

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
