interface BadgeProps {
  label: string;
  color?: "green" | "blue" | "gray";
}

export const Badge = ({ label, color = "gray" }: BadgeProps) => {
  const colors = {
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    gray: "bg-gray-100 text-gray-800",
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${colors[color]}`}>
      {label}
    </span>
  );
};
