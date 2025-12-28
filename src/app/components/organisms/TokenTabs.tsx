interface Props {
  stage: "new" | "final" | "active";
  onChange: (stage: "new" | "final" | "active") => void;
}

export const TokenTabs = ({ stage, onChange }: Props) => (
  <div className="flex gap-2 mb-4">
    {(["new", "final", "active"] as const).map(s => (
      <button
        key={s}
        className={`px-3 py-1 rounded ${stage === s ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}
        onClick={() => onChange(s)}
      >
        {s.toUpperCase()}
      </button>
    ))}
  </div>
);
