import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(dirtyHtml: string): string {
  return DOMPurify.sanitize(dirtyHtml);
}
