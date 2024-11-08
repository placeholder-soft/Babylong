export function formatDate(timestamp?: number): string {
  if (!timestamp) return ""
  const date = new Date(timestamp)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }
  return date.toLocaleDateString("en-GB", options).replace(/\//g, "/")
}

export function formatTime(timestamp?: number): string {
  if (!timestamp) return ""
  const date = new Date(timestamp)
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }
  return date.toLocaleTimeString("en-GB", options)
}
