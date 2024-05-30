export const API_URL =
process.env.NODE_ENV === "production"
  ? "https://helpdeskunity.netlify.app/api/ticket"
  : "http://127.0.0.1:3000/api/ticket";

export const apiUsuarios = () => {
    return API_URL + '/usuarios'
}
export const apiSectores = () => {
    return API_URL + '/sectores'
}