import { convertToModelMessages, streamText, type UIMessage } from "ai";

import { resolveChatModel } from "@/lib/chat-models";

export async function POST(req: Request) {
  const { messages, model }: { messages: UIMessage[]; model?: string } =
    await req.json();

  const result = streamText({
    model: resolveChatModel(model),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
