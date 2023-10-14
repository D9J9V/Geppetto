import type { NextApiRequest, NextApiResponse } from "next";
import openai from "@/app/api/chatgpt";

type Option = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Option[];
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const models = await openai.models.list().then((response) => response.data);

  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.id,
  }));

  return new Response(JSON.stringify({ modelOptions }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export { handler as GET, handler as POST };
