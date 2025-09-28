interface PriorityBadgeProps {
  priority: "High" | "Medium" | "Low";
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const colors = {
    High: "bg-red-500",
    Medium: "bg-yellow-400",
    Low: "bg-gray-400",
  };

  const labels = {
    High: "Alta",
    Medium: "Media",
    Low: "Baja",
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`w-3 h-3 rounded-full ${colors[priority]}`} />
      {labels[priority]}
    </div>
  );
}
