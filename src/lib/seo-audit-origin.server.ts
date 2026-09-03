import { getRequest } from "@tanstack/react-start/server";

export function requestOrigin(): string {
  const req = getRequest();
  const url = new URL(req.url);
  const sandboxHost =
    url.hostname === "localhost" ? req.headers.get("x-forwarded-host") : null;
  return sandboxHost ? `https://${sandboxHost}` : url.origin;
}
