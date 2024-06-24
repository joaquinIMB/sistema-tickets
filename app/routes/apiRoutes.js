export const API_URL =
process.env.NODE_ENV === "production"
  ? "https://sistema-tickets-pink.vercel.app/api/ticket"
  : "http://127.0.0.1:3000/api/ticket";