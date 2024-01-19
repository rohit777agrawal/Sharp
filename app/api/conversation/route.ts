import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
//import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";

// import { checkSubscription } from "@/lib/subscription";
// import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

//const openai = new OpenAIApi(configuration);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    console.log("body", body);
    const { messages  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    // const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();

    // if (!freeTrial && !isPro) {
    //   return new NextResponse("Free trial has expired. Please upgrade to pro.", { status: 403 });
    // }

    // const response = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages
    // });

    // const completion = await openai.chat.completions.create({
    //   messages,
    //   model: "gpt-3.5-turbo",
    // });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,

      // temperature: 1,
      // max_tokens: 256,
      // top_p: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
    });
    console.log("Response", response.choices[0].message);
    // if (!isPro) {
    //   await incrementApiLimit();
    // }
    return NextResponse.json(response.choices[0].message);
   //return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};