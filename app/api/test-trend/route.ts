import { NextResponse }
  from "next/server";

import {
  analyzeTrend,
} from "@/services/trend-engine.service";

export async function GET() {

  try {

    const result =
      await analyzeTrend(
        "Cockroach Janta Party"
      );

    return NextResponse.json({
      success: true,
      data: result,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}