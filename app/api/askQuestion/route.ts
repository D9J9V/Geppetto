import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";
import query from "@/app/api/queryApi";

async function handler(req: Request, res: Response) {
  // Acceder al cuerpo de la solicitud
  const requestBody = await req.json();

  // Desestructurar los datos del cuerpo
  const { prompt, chatId, model, session } = requestBody;

  if (!prompt) {
    return new Response("No prompt provided");
  }
  if (!chatId) {
    return new Response("No chatId provided");
  }

  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response || "ChatGPT was unable to find an answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://links.papareact.com/89k",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  return new Response(JSON.stringify({ answer: message.text }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export { handler as POST, handler as GET };
