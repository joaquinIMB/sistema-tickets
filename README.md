# Sistema de Tickets

Este es el repositorio del proyecto final desarrollado para el curso de Next JS en CODERHOUSE. Se trata de un sistema de gestión de tickets diseñado para mejorar la comunicación y seguimiento de incidencias dentro de una organización.

## Descripción

El sistema permite a los usuarios crear, visualizar y gestionar tickets de soporte de manera eficiente. Incluye funcionalidades como:

- **Creación de Tickets**: Los usuarios pueden reportar incidencias detallando el problema encontrado.
- **Gestión de Estados**: Cada ticket puede tener estados como "Abierto", "En Proceso" o "Cerrado" para un seguimiento adecuado.
- **Notificaciones en Tiempo Real**: Actualizaciones instantáneas sobre el estado de los tickets.
- **Panel de Administración**: Interfaz dedicada para que los administradores gestionen y asignen tickets.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para el desarrollo del frontend.
- **Express.js**: Framework para el backend en Node.js.
- **Tailwind CSS**: Framework de CSS para el diseño responsivo y estilizado.
- **MSSQL**: Base de datos utilizada para almacenar la información de los tickets.
- **RTK Query**: Herramienta para la gestión eficiente de datos en el frontend.
- **Context API**: Mecanismo de React para manejar el estado global de la aplicación.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- `/app`: Contiene los componentes y páginas principales de la aplicación.
- `/public`: Recursos estáticos como imágenes y archivos.
- `package.json`: Archivo con las dependencias y scripts del proyecto.
- `tailwind.config.js`: Configuración personalizada para Tailwind CSS.
- `next.config.js`: Configuración específica para Next.js.

## Instalación y Uso

Para ejecutar el proyecto localmente:

1. Clona este repositorio:

   ```bash
   git clone https://github.com/joaquinIMB/sistema-tickets.git
Navega al directorio del proyecto:

bash
Copiar
Editar
cd sistema-tickets
Instala las dependencias necesarias:

bash
Copiar
Editar
npm install
Inicia el servidor de desarrollo:

bash
Copiar
Editar
npm run dev
Abre http://localhost:3000 en tu navegador para ver la aplicación en funcionamiento.

Demo
Puedes ver una versión en vivo del sistema de tickets en el siguiente enlace:

[Sistema de Tickets](https://sistema-tickets-punto.vercel.app/auth/iniciar-sesion)

Contribuciones
Este proyecto fue desarrollado como parte del curso de CODERHOUSE. Actualmente, no se aceptan contribuciones externas, pero cualquier comentario o sugerencia es bienvenido.
