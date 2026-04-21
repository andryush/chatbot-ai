import { google } from "@ai-sdk/google";

export const CHAT_MODELS = [
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
] as const;

export type ChatModelId = (typeof CHAT_MODELS)[number]["id"];

const ALLOWED_IDS = new Set<string>(CHAT_MODELS.map((m) => m.id));

export const DEFAULT_CHAT_MODEL_ID: ChatModelId = "gemini-2.5-flash";

export function resolveChatModel(modelId: string | undefined) {
  const id: ChatModelId =
    modelId && ALLOWED_IDS.has(modelId)
      ? (modelId as ChatModelId)
      : DEFAULT_CHAT_MODEL_ID;
  return google(id);
}
