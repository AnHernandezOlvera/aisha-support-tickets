import type { Ticket } from "./ticketsSlice";

export const ticketsMock: Ticket[] = [
  {
    id: "1",
    subject: "Error al iniciar sesión en la plataforma",
    description: "El sistema no permite el acceso con credenciales válidas.",
    priority: "High",
    date: "2025-09-20",
    status: "Open",
  },
  {
    id: "2",
    subject: "No aparecen citas agendadas en el calendario",
    description:
      "El calendario del usuario se muestra vacío aunque tiene citas registradas.",
    priority: "Medium",
    date: "2025-09-21",
    status: "In Progress",
  },
  {
    id: "3",
    subject: "Problema al descargar resultados de laboratorio",
    description:
      "Los PDFs de resultados no se generan correctamente al dar clic en descargar.",
    priority: "High",
    date: "2025-09-22",
    status: "Closed",
  },
  {
    id: "4",
    subject: "El formulario de registro no guarda datos completos",
    description:
      "Al registrar un paciente nuevo, algunos campos quedan en blanco en la base.",
    priority: "Medium",
    date: "2025-09-23",
    status: "Closed",
  },
  {
    id: "5",
    subject: "Falla en la carga de documentos adjuntos",
    description: "Los archivos PDF y JPG no se suben al expediente clínico.",
    priority: "Low",
    date: "2025-09-24",
    status: "Closed",
  },
  {
    id: "6",
    subject: "Notificaciones de cita no enviadas por correo",
    description: "Los pacientes no reciben correos de confirmación de cita.",
    priority: "High",
    date: "2025-09-25",
    status: "Closed",
  },
  {
    id: "7",
    subject: "Inconsistencia en el historial clínico mostrado",
    description: "Se muestran datos de otro paciente en el historial clínico.",
    priority: "High",
    date: "2025-09-26",
    status: "Closed",
  },
  {
    id: "8",
    subject: "Sección de facturación no disponible",
    description: "Al acceder al módulo de facturación, aparece un error 500.",
    priority: "Medium",
    date: "2025-09-27",
    status: "Closed",
  },
  {
    id: "9",
    subject: "La aplicación móvil se cierra inesperadamente",
    description:
      "En Android la app se cierra al intentar abrir la sección de reportes.",
    priority: "High",
    date: "2025-09-28",
    status: "Closed",
  },
  {
    id: "10",
    subject: "Problema con actualización de datos de paciente",
    description:
      "Los cambios en dirección o teléfono no se guardan en el perfil del paciente.",
    priority: "Medium",
    date: "2025-09-29",
    status: "Closed",
  },
];
