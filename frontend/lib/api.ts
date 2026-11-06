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
  // Prefix with base path so requests go to /qualitas/api/php/...
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const url = `${basePath}/api/php/${path.replace(/^\/+/, "")}`;
  
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