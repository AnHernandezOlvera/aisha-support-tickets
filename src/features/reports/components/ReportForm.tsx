import { Alert, Button, MenuItem, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormField } from "../../../hooks/useFormField";
import { addTicket, type Ticket } from "../store/tickets/ticketsSlice";
import FileUpload from "./FileUpload";

/**
 * Form component for creating new support tickets.
 *
 * Includes fields for subject, priority, detail, and optional file upload.
 * On submit, dispatches a Redux action to add the ticket and shows feedback with Snackbar.
 */


function ReportForm() {
  const subject = useFormField("", "El asunto es obligatorio");
  const priority = useFormField("", "La prioridad es obligatoria");
  const detail = useFormField("");
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const dispatch = useDispatch();

  const priorityMap: Record<string, "Low" | "Medium" | "High"> = {
    alta: "High",
    media: "Medium",
    baja: "Low",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isValid = [subject.validate(), priority.validate()].every(Boolean);
      if (!isValid) {
        setSnackbar({
          open: true,
          message: "Por favor completa los campos requeridos",
          severity: "error",
        });
        return;
      }

      const newTicket: Ticket = {
        id: crypto.randomUUID(),
        subject: subject.value,
        description: detail.value,
        priority: priorityMap[priority.value],
        date: new Date().toISOString(),
        status: "Open",
      };

      dispatch(addTicket(newTicket));


      subject.reset();
      priority.reset();
      detail.reset();

      setSnackbar({
        open: true,
        message: "Ticket agregado",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Ocurrió un error al crear el ticket",
        severity: "error",
      });
    }
  };

  return (
    <div className="py-6 px-8">
      <Typography className="text-brand" variant="h6" fontWeight="bold">
        Cuéntanos qué necesitas resolver
      </Typography>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
        <TextField
          label="Asunto"
          aria-label="report-form"
          value={subject.value}
          onChange={subject.handleChange}
          onBlur={subject.handleBlur}
          error={!!subject.error}
          helperText={subject.error}
          fullWidth
          size="small"
          required
        />

        <TextField
          select
          label="Prioridad"
          value={priority.value}
          onChange={priority.handleChange}
          onBlur={priority.handleBlur}
          error={!!priority.error}
          helperText={priority.error}
          fullWidth
          size="small"
          required
        >
          <MenuItem value="alta">Alta</MenuItem>
          <MenuItem value="media">Media</MenuItem>
          <MenuItem value="baja">Baja</MenuItem>
        </TextField>

        <TextField label="Detalle" value={detail.value} onChange={detail.handleChange} multiline rows={3} fullWidth />

        <FileUpload onFile={() => {}} />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!subject.value.trim() || !priority.value}
          className="self-start"
        >
          Enviar reporte
        </Button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        className="!fixed !top-1/2 !left-1/2 !-translate-x-1/2 !-translate-y-1/2"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
    </div>
  );
}

export default ReportForm;
