import {
    IconButton,
    Paper,
    TablePagination,
    Tooltip,
} from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

import PriorityBadge from "./PriorityBadge";
import StatusChip from "./StatusChip";

export default function ReportsTableMobile() {
    const tickets = useSelector((state: RootState) => state.tickets.items);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    return (
        <Paper className="shadow-md rounded-lg divide-y">
            {tickets
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((ticket) => (
                    <div
                        key={ticket.id}
                        className="p-4 hover:bg-[var(--color-brand)] hover:text-white transition-colors"
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-bold">{ticket.subject}</span>
                            <div className="space-x-2">
                                <Tooltip title="Ver detalle">
                                    <IconButton
                                        size="small"
                                        onClick={() => console.log("Ver detalle", ticket)}
                                        sx={{ color: "inherit" }}
                                    >
                                        <VisibilityIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar">
                                    <IconButton
                                        size="small"
                                        onClick={() => console.log("Eliminar", ticket)}
                                        sx={{ color: "inherit" }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                        <p className="text-sm mt-1">
                            Prioridad: <PriorityBadge priority={ticket.priority} /> · Fecha:{" "}
                            {ticket.date}
                        </p>
                        <p className="text-sm">
                            Estatus: <StatusChip status={ticket.status} />
                        </p>
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
        </Paper>
    );
}
