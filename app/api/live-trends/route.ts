import { NextResponse }
from "next/server";

import {
  getTrendingSearches,
} from "@/services/google-trends.service";

export async function GET() {

  try {

    const trends =
      await getTrendingSearches();

    return NextResponse.json({

      success: true,

      trends,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        trends: [],
      },
      {
        status: 500,
      }
    );
  }
}