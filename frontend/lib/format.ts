export const formatNaira = (amount: number | string) =>
  `₦${Number(amount).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const getInitials = (name: string) =>
  name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

export const asset = (path: string | null | undefined): string => {
  if (!path) return "";
  
  let normalized = path;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

  // 1. If path is a localhost URL from the backend, rewrite it to cPanel
  if (normalized.includes("http://localhost") && apiUrl) {
    const rootUrl = apiUrl.replace(/\/api$/, ""); // https://www.ugwuuvuoma.com/qualitas-api
    normalized = normalized.replace("http://localhost/qualitas-rebuild/backend", rootUrl);
  }

  // 2. If it's already a full URL, return it
  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return normalized;
  }

  // 3. Handle database relative paths (e.g., "../products/foo.png")
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  while (normalized.startsWith("../")) {
    normalized = normalized.substring(3);
  }
  if (!normalized.startsWith("/")) {
    normalized = "/" + normalized;
  }
  
  return `${basePath}${normalized}`;
};