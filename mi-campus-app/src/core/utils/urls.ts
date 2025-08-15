/**
 * Convierte una URL relativa en absoluta usando la configuración del entorno
 * @param relativeOrAbsolute - Puede ser una URL relativa (/images/foo.jpg) o absoluta (http://...)
 * @returns URL absoluta
 */
export function toPublicUrl(relativeOrAbsolute: string): string {
  if (!relativeOrAbsolute) return "";
  
  // Si ya es una URL absoluta, la devolvemos tal cual
  if (relativeOrAbsolute.startsWith("http")) {
    return relativeOrAbsolute;
  }

  // Aseguramos que la ruta relativa comience con /
  const normalizedPath = relativeOrAbsolute.startsWith("/") 
    ? relativeOrAbsolute 
    : `/${relativeOrAbsolute}`;


const FILES_BASE = import.meta.env.VITE_FILES_BASE || "http://localhost:7168"; 
const imgUrl = (u?: string) => {
  if (!u) return "";
  // Si ya tiene http:// o https://, se considera una URL completa
  if (u.startsWith("http")) return u;
  return `${FILES_BASE}${u}`; // De lo contrario, se le agrega la base de la URL
};

  // Fallback: derivamos de VITE_API_URL
  const apiUrl = import.meta.env.VITE_API_URL || "";
  const baseUrl = apiUrl.endsWith("/api") 
    ? apiUrl.slice(0, -4) 
    : apiUrl.replace(/\/api\/?$/, "");

  return `${baseUrl}${normalizedPath}`;
}