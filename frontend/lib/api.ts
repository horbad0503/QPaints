type ApiOptions = Omit<RequestInit, "body"> & { body?: unknown };

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public payload: unknown
  ) {
    super(message);
  }
}

export async function api<T = unknown>(
  path: string,
  { body, ...init }: ApiOptions = {}
): Promise<T> {
  const cleanPath = path.replace(/^\/+/, "");

  // In production: call cPanel directly (so the browser sends its session cookie)
  // In local dev: use the Next.js rewrite (which proxies to XAMPP)
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  const url = apiBase
    ? `${apiBase}/${cleanPath}`
    : `/api/php/${cleanPath}`;

  const res = await fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = (data as { error?: string }).error || "Request failed";
    throw new ApiError(msg, res.status, data);
  }
  return data as T;
}