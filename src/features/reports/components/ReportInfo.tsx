import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"
import EngineeringIcon from "@mui/icons-material/Engineering"
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive"
import { List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"

function ReportInfo() {
  return (
    <div className="py-6 px-8 bg-gray-200">
      <Typography className="text-brand" variant="h6" fontWeight="bold" gutterBottom>
        ¿Cómo atenderemos tu solicitud?
      </Typography>

      <List className="text-gray">
        <ListItem>
          <ListItemIcon>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-brand">
              <AssignmentTurnedInIcon className="text-white" />
            </div>
          </ListItemIcon>
          <ListItemText
            primary="1. Recibiremos tu reporte"
            secondary="Nuestro servicio está disponible 24/7."
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-brand">
              <EngineeringIcon className="text-white" />
            </div>
          </ListItemIcon>
          <ListItemText
            primary="2. Asignaremos a un técnico"
            secondary="Tu reporte será atendido de manera rápida y eficaz."
          />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-brand">
              <NotificationsActiveIcon className="text-white" />
            </div>
          </ListItemIcon>
          <ListItemText
            primary="3. Notificaremos la solución"
            secondary="Recibirás una notificación cuando tu incidencia sea resuelta."
          />
        </ListItem>
      </List>
    </div>
  )
}

export default ReportInfo