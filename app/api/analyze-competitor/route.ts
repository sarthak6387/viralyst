import { NextResponse }
from "next/server";

import {
  extractChannelHandle,
} from "@/services/youtube-parser.service";

import {
  fetchChannelData,
  fetchChannelVideos,
} from "@/services/competitor.service";

import {
  analyzeCompetitor,
} from "@/services/competitor-analytics.service";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const {
      url,
    } = body;

    // EXTRACT HANDLE

    const handle =
      extractChannelHandle(
        url
      );

    if (!handle) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid channel URL",
        },
        {
          status: 400,
        }
      );
    }

    // FETCH CHANNEL

    const channel =
      await fetchChannelData(
        handle
      );

    const channelId =
      channel?.id?.channelId;

    if (!channelId) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Channel not found",
        },
        {
          status: 404,
        }
      );
    }

    // FETCH VIDEOS

    const videos =
      await fetchChannelVideos(
        channelId
      );

    // ANALYZE

    const analytics =
      analyzeCompetitor(
        videos
      );

    return NextResponse.json({

      success: true,

      channel,

      analytics,

      videos,
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