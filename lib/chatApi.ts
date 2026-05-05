export type ChatContext = Record<string, unknown>;

export type ChatResponse = {
  reply: string;
};

export type ChatImagePayload = {
  imageBase64: string;
  imageMimeType: string;
};

export type ChatPrediction = {
  label: string;
  confidence: number; // 0–1
};

type ChatErrorBody = {
  error?: unknown;
};

export async function sendChat(
  message: string,
  context?: ChatContext,
  imagePayload?: ChatImagePayload,
  prediction?: ChatPrediction
): Promise<ChatResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      context,
      ...(imagePayload
        ? {
            imageBase64: imagePayload.imageBase64,
            imageMimeType: imagePayload.imageMimeType,
          }
        : {}),
      ...(prediction ? { prediction } : {}),
    }),
  });

  let responseBody: unknown = null;
  try {
    responseBody = await response.json();
  } catch {
    responseBody = null;
  }

  if (!response.ok) {
    const errorBody = responseBody as ChatErrorBody | null;
    const messageFromServer =
      errorBody && typeof errorBody.error === "string"
        ? errorBody.error
        : "Gagal mengirim chat.";

    throw new Error(messageFromServer);
  }

  if (
    typeof responseBody !== "object" ||
    responseBody === null ||
    !("reply" in responseBody) ||
    typeof responseBody.reply !== "string"
  ) {
    throw new Error("Format respons chat tidak valid.");
  }

  return { reply: responseBody.reply };
}
