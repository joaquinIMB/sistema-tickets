export const API_URL =
process.env.NODE_ENV === "production"
  ? "http://localhost:3000/api/ticket"
  : "http://localhost:3000/api/ticket";

export const API_URL_SERVICES = 
process.env.NODE_ENV === "production" 
? "http://localhost:3000/api/" 
: "http://localhost:3000/api/"