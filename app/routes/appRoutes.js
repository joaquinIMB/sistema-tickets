export const urlBase = (parametro) => {
    return `/admin/ticket/${parametro}`
}

export const urlState = (estado) => {
    return `/admin/ticket/estado/${estado}`
}

export const urlRegistroUsuario = () => {
    return API_URL + "/auth/registrar-usuario"
}