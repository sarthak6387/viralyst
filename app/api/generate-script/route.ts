import { NextResponse }
from "next/server";

import {
  generateAIScript,
} from "@/services/script-generator.service";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      topic,
    } = body;

    const script =
      await generateAIScript(
        topic
      );

    return NextResponse.json({

      success: true,

      script,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}