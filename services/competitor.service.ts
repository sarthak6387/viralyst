const API_KEY =
  process.env
    .YOUTUBE_API_KEY;

const BASE_URL =
  "https://www.googleapis.com/youtube/v3";


// FETCH CHANNEL DETAILS

export async function
fetchChannelData(
  handle: string
) {

  try {

    const response =
      await fetch(

`${BASE_URL}/search?part=snippet&type=channel&q=${handle}&key=${API_KEY}`

      );

    const data =
      await response.json();

    return data.items?.[0];

  } catch (error) {

    console.error(error);

    return null;
  }
}


// FETCH CHANNEL VIDEOS

export async function
fetchChannelVideos(
  channelId: string
) {

  try {

    const response =
      await fetch(

`${BASE_URL}/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${API_KEY}`

      );

    const data =
      await response.json();

    return data.items || [];

  } catch (error) {

    console.error(error);

    return [];
  }
}