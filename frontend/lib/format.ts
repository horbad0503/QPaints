export const formatNaira = (amount: number | string) =>
  `₦${Number(amount).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const getInitials = (name: string) =>
  name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

/**
 * Normalizes any image path to include the base path (/qualitas)
 * Handles paths from DB like "../products/foo.png" and static paths like "/images/foo.png"
 */
export const asset = (path: string | null | undefined): string => {
  if (!path) return "";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  
  // Strip all leading "../" so DB paths become "/products/foo.png"
  let normalized = path;
  while (normalized.startsWith("../")) {
    normalized = normalized.substring(3);
  }
  // Ensure leading slash
  if (!normalized.startsWith("/")) {
    normalized = "/" + normalized;
  }
  // If path is already a full URL, return as-is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${basePath}${normalized}`;
};