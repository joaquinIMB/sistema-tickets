export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://sistema-tickets-punto.vercel.app/api/ticket"
    : "http://localhost:3000/api/ticket";

export const API_URL_SERVICES =
  process.env.NODE_ENV === "production"
    ? "https://sistema-tickets-punto.vercel.app/api/"
    : "http://localhost:3000/api/";
