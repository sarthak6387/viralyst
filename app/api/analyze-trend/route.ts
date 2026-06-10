import { NextResponse }
  from "next/server";

import {
  analyzeTrend,
} from "@/services/trend-engine.service";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      keyword,
    } = body;

    const data =
      await analyzeTrend(
        keyword
      );

    return NextResponse.json({
      success: true,
      data,
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