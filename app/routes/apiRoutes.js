export const API_URL =
process.env.NODE_ENV === "production"
  ? process.env.URL_PROD
  : process.env.URL_DEV

export const apiUsuarios = () => {
    return API_URL + `/usuarios`
}
export const apiSectores = () => {
    return API_URL + '/sectores'
}