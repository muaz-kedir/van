const YOUTUBE_REGEXPS = [
  /(?:https?:\/\/)?(?:www\.|m\.)?youtu\.be\/(?<id>[\w-]{11})/i,
  /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/watch\?(?:.*&)?v=(?<id>[\w-]{11})/i,
  /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/embed\/(?<id>[\w-]{11})/i,
  /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/shorts\/(?<id>[\w-]{11})/i,
];

const extractYoutubeId = (url) => {
  if (typeof url !== "string") return null;

  const trimmed = url.trim();

  for (const pattern of YOUTUBE_REGEXPS) {
    const match = trimmed.match(pattern);
    if (match?.groups?.id) {
      return match.groups.id;
    }
  }

  return null;
};

export default extractYoutubeId;
