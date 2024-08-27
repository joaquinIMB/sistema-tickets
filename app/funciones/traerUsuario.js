import axios from "axios";
import { API_URL } from "@/routes/apiRoutes";

export const traerUsuario = async (idUsuario) => {
  try {
    const response = await axios.get(
      `${API_URL}/usuario/${idUsuario.trim()}`
    );
    const usuario = response.data;
    return usuario;
  } catch (error) {
    console.error("Error al traer usuario:", error);
  }
};
