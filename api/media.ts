/* eslint-disable @typescript-eslint/no-explicit-any */

import { getStaticURL } from "./config";

export function getStrapiMedia(media: any, size?: "S" | "M" | "T" | "L") {
  const { url = "", formats = "" } = media.cover || media.image || {};
  const { url: smallImgUrl = "" } = formats?.small || {};
  const { url: mediumImgUrl = "" } = formats?.medium || {};
  const { url: thumbnailUrl = "" } = formats?.thumbnail || {};
  const { url: largeUrl = "" } = formats?.large || {};

  const imgUrl =
    size === "M"
      ? mediumImgUrl || url
      : size === "S"
      ? smallImgUrl || url
      : size === "T"
      ? thumbnailUrl || url
      : size === "L"
      ? largeUrl || url
      : url;

  return url.startsWith("/") ? getStaticURL(imgUrl) : imgUrl;
}
