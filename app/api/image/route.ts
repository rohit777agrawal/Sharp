import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// import { checkSubscription } from "@/lib/subscription";
// import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";


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
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount of picture is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution of picture is required", { status: 400 });
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

   
    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });
    // if (!isPro) {
    //   await incrementApiLimit();
    // }
    return NextResponse.json(response.data);
   //return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};