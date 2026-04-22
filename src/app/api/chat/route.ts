import { devToolsMiddleware } from "@ai-sdk/devtools";
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
  wrapLanguageModel,
} from "ai";
import { SYSTEM_PROMPTS } from "@/app/system-prompts";
import { resolveChatModel } from "@/lib/chat-models";

const injectDevToolsMiddleware = (model: string | undefined) => {
  return wrapLanguageModel({
    model: resolveChatModel(model),
    middleware: devToolsMiddleware(),
  });
};

export async function POST(req: Request) {
  const { messages, model }: { messages: UIMessage[]; model?: string } =
    await req.json();

  const result = streamText({
    model: injectDevToolsMiddleware(model),
    messages: await convertToModelMessages(messages),
    system: SYSTEM_PROMPTS.find((prompt) => prompt.id === "slang")?.prompt,
  });

  return result.toUIMessageStreamResponse();
}
