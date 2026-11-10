export const formatNaira = (amount: number | string) =>
  `₦${Number(amount).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const getInitials = (name: string) =>
  name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

/**
 * Normalizes any image path to include the base path or production domain.
 */
export const asset = (path: string | null | undefined): string => {
  if (!path) return "";
  
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; 

  // 1. Handle absolute URLs (like the ones returned by your backend)
  if (path.startsWith("http://") || path.startsWith("https://")) {
    // If the backend returned a localhost URL, rewrite it for production
    if (path.includes("http://localhost") && apiUrl) {
      const rootUrl = apiUrl.replace(/\/api$/, ""); // Get base cPanel URL
      return path.replace("http://localhost/qualitas-rebuild/backend", rootUrl);
    }
    // Otherwise, it's already a valid production URL
    return path;
  }

  // 2. Handle paths from the database (e.g., "../products/foo.png")
  let normalized = path;
  while (normalized.startsWith("../")) {
    normalized = normalized.substring(3);
  }
  if (!normalized.startsWith("/")) {
    normalized = "/" + normalized;
  }
  
  return `${basePath}${normalized}`;
};