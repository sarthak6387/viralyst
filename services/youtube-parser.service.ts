export function extractChannelHandle(
  url: string
) {

  try {

    const cleanUrl =
      url.trim();

    // HANDLE FORMAT
    // youtube.com/@channel

    const handleMatch =
      cleanUrl.match(
        /youtube\.com\/@([^\/\?]+)/
      );

    if (handleMatch) {

      return handleMatch[1];
    }

    return null;

  } catch (error) {

    console.error(error);

    return null;
  }
}