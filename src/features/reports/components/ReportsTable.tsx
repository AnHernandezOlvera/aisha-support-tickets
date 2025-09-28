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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import type { Ticket } from "../store/tickets/ticketsSlice";
import { deleteTicket } from "../store/tickets/ticketsSlice";
import TicketDetail from "./TicketDetail";

import PriorityBadge from "./PriorityBadge";
import StatusChip from "./StatusChip";

/**
 * Table component to display a paginated list of tickets.
 *
 * Features:
 * - Shows subject, priority, date and status
 * - Allows viewing detailed info in a dialog
 * - Allows deleting tickets with confirmation and feedback
 */

export default function ReportsTable() {
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
      } catch (error) {
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

  const handleOpenDetail = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
    setSelectedTicket(null);
  };

  return (
    <Paper className="shadow-md rounded-lg">
      <TableContainer>
        <Table>
          <TableHead className="bg-[var(--color-medium-gray)]/30">
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Asunto</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Prioridad</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Estatus</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4, color: "text.secondary" }}>
                  No tickets available
                </TableCell>
              </TableRow>
            ) : (
              tickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ticket) => (
                <TableRow
                  key={ticket.id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "var(--color-brand) !important",
                      color: "#fff",
                      "& .MuiTableCell-root": {
                        color: "#fff",
                        fontWeight: "bold",
                      },
                      "& .MuiSvgIcon-root": { color: "#fff" },
                    },
                    "&:nth-of-type(even)": {
                      backgroundColor: "rgba(182, 182, 182, 0.3)",
                    },
                  }}
                >
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    <PriorityBadge priority={ticket.priority} />
                  </TableCell>
                  <TableCell>{ticket.date}</TableCell>
                  <TableCell>
                    <StatusChip status={ticket.status} />
                  </TableCell>
                  <TableCell align="right" className="space-x-2">
                    <Tooltip title="Ver detalle">
                      <IconButton size="small" onClick={() => handleOpenDetail(ticket)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton size="small" onClick={() => handleDeleteClick(ticket.id)} color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

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

      <TicketDetail open={openDetail} onClose={handleCloseDetail} ticket={selectedTicket} />

      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este ticket? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} variant="contained" color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

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
