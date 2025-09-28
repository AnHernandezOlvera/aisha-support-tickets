import { Chip } from "@mui/material";

interface StatusChipProps {
  status: "Open" | "In Progress" | "Closed";
}

export default function StatusChip({ status }: StatusChipProps) {
  const config = {
    Open: { label: "Pendiente", sx: { backgroundColor: "#f8d7da" } },
    "In Progress": { label: "En proceso", sx: { backgroundColor: "#ffeeba", color: "#856404" } },
    Closed: { label: "Resuelto", sx: { backgroundColor: "#d4edda", color: "#155724" } },
  };

  return <Chip label={config[status].label} sx={config[status].sx} />;
}
