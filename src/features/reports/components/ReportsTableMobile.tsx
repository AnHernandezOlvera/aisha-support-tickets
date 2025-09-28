import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper,
    Snackbar,
    TablePagination,
    Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { Ticket } from "../store/tickets/ticketsSlice";
import { deleteTicket } from "../store/tickets/ticketsSlice";
import PriorityBadge from "./PriorityBadge";
import StatusChip from "./StatusChip";
import TicketDetail from "./TicketDetail";

export default function ReportsTableMobile() {
  const tickets = useSelector((state: RootState) => state.tickets.items);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [openDetail, setOpenDetail] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<string | null>(null);

  const handleOpenDetail = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setSelectedTicket(null);
    setOpenDetail(false);
  };

  const handleDeleteClick = (id: string) => {
    setTicketToDelete(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (ticketToDelete) {
      try {
        dispatch(deleteTicket(ticketToDelete));
        setSnackbar({
          open: true,
          message: "Ticket eliminado correctamente",
          severity: "success",
        });
      } catch {
        setSnackbar({
          open: true,
          message: "Ocurrió un error al eliminar el ticket",
          severity: "error",
        });
      }
    }
    setConfirmOpen(false);
    setTicketToDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setTicketToDelete(null);
  };

  return (
    <Paper className="shadow-md rounded-lg divide-y">
      {tickets
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((ticket) => (
          <div
            key={ticket.id}
            className="p-4 hover:bg-[var(--color-brand)] hover:text-white transition-colors flex flex-col justify-between"
          >
            <span className="font-bold">{ticket.subject}</span>

            <p className="text-sm mt-1">
              Prioridad: <PriorityBadge priority={ticket.priority} /> · Fecha:{" "}
              {ticket.date}
            </p>
            <p className="text-sm">
              Estatus: <StatusChip status={ticket.status} />
            </p>

            {/* Acciones */}
            <div className="flex justify-end mt-2 space-x-2">
              <Tooltip title="Ver detalle">
                <IconButton
                  size="small"
                  onClick={() => handleOpenDetail(ticket)}
                  sx={{ color: "inherit" }}
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar">
                <IconButton
                  size="small"
                  onClick={() => handleDeleteClick(ticket.id)}
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ))}

      <TablePagination
        component="div"
        count={tickets.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        labelRowsPerPage="Filas por página"
      />

      {/* Detalle */}
      <TicketDetail
        open={openDetail}
        onClose={handleCloseDetail}
        ticket={selectedTicket}
      />

      {/* Confirmación */}
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este ticket? Esta acción no se
            puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelDelete}
            variant="contained"
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        className="!fixed !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2"
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
