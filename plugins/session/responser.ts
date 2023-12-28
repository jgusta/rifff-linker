type Maybe<T> = T | null;
let body: Maybe<string>;

const headers = new Headers();

type ResponseType = "page" | "json";

function addHeader(name: string, value: string) {
  headers.append(name, value);
}

function setBody(_body: string) {
  body = _body;
}

function getHeaders() {
  return headers;
}

function getResponse(
  bodyNow: string | null = null,
  type: ResponseType = "page",
) {
  switch (type) {
    case "page":
      addHeader("Content-Type", "text/html; charset=utf-8");
      break;
    case "json":
      addHeader("Content-Type", "application/json");
      break;
    default:
      throw new Error("bad response type");
  }
  const _body: Maybe<BodyInit> = bodyNow || body || null;
  const options: ResponseInit = {
    headers: headers,
    status: 200,
    statusText: "OK",
  };
  if (null !== _body) {
    const blob = new Blob([_body], { type: "application/json" });
    return new Response(blob, options);
  }
  return new Response(null, options);
}

export { addHeader, getHeaders, getResponse, setBody };
