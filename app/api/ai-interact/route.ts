import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}

console.log(
  "This is the google api key from my env: ",
  process.env.GOOGLE_API_KEY
);

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function GET() {
  return NextResponse.json(
    {
      msg: "If you're reading this, the server is functioning.",
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export async function POST(req: Request) {
  try {
    const { question, messageList } = await req.json();

    // Step 3️⃣ Build prompt

    // todo: add 'suggest other options based on what the user has chosen'
    const prompt = `
        The user is asking you questions based on their previously added data, which is given below. Precisely answer the question that they ask based on their data.
        Keep the answers relevant and professional. Make sure to keep the conversation about the users data, do not deviate. In case of deviations, politely bring the user back on topic.

Here is the context/ previously added data: 
${messageList}

Here's the Question/input given by the user:
${question}
Answer:
`;
    let answer;
    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      console.log(response.text);
      return response.text;
    }

    answer = await main();

    // Step 4️⃣ Call LLM

    return NextResponse.json(
      { answer },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
