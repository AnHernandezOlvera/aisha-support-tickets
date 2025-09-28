import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from "@mui/material";
import type { Ticket } from "../store/tickets/ticketsSlice";
import PriorityBadge from "./PriorityBadge";
import StatusChip from "./StatusChip";

/**
 * Dialog component to show detailed information about a ticket.
 *
 * Props:
 * @param open - Whether the dialog is visible
 * @param onClose - Callback to close the dialog
 * @param ticket - Ticket object to display
 */


type TicketDetailProps = {
  open: boolean;
  onClose: () => void;
  ticket: Ticket | null;
};

function TicketDetail({ open, onClose, ticket }: TicketDetailProps) {
  if (!ticket) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Detalle del Ticket</DialogTitle>
      <DialogContent dividers>
        <Box className="flex flex-col gap-3">
          <Typography variant="h6">{ticket.subject}</Typography>
          <Divider />

          <Typography variant="body2" color="textSecondary">
            Fecha: {new Date(ticket.date).toLocaleString()}
          </Typography>

          <Box className="flex gap-3 items-center">
            <PriorityBadge priority={ticket.priority} />
            <StatusChip status={ticket.status} />
          </Box>

          {ticket.description && (
            <Typography variant="body1" className="mt-2">
              {ticket.description}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TicketDetail;
