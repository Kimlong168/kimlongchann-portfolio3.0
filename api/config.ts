import qs from "qs";

export const revalidate = 3600;

export const getStaticURL = (path = "") => {
  const baseURL = process.env.NEXT_PUBLIC_STRAPI_URL;
  return `${baseURL}${path}`;
};

export const fetchAPI = async <T>(
  path: string,
  urlParamsObject = {},
  options = {}
) => {
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${process.env.NEXT_STRAPI_TOKEN}`,
    },
    next: { revalidate: 300, tags: ["api"] },
    ...options,
  };

  // Build request URL
  const query = qs.stringify(urlParamsObject);
  const endpoint = `/api${path}${query ? `?${query}` : ""}`;
  const requestUrl = getStaticURL(endpoint);

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.error(response.statusText);
    throw new Error(`An error occurred please try again`);
  }

  return response.json() as T;
};
