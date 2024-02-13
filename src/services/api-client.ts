const baseUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

export enum ReqMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export default (
  endpoint: string,
  method: ReqMethod,
  signal: AbortSignal,
): Promise<Response> => {
  const url = baseUrl + endpoint + `?key=${apiKey}`;

  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });
};
