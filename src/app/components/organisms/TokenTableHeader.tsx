interface Props {
  onSort?: (field: string) => void;
}

export const TokenTableHeader = ({ onSort }: Props) => (
  <thead>
    <tr className="bg-gray-100">
      <th className="px-2 py-1 cursor-pointer" onClick={() => onSort?.("name")}>Name</th>
      <th className="px-2 py-1 cursor-pointer" onClick={() => onSort?.("price")}>Price</th>
      <th className="px-2 py-1">Stage</th>
      <th className="px-2 py-1">Actions</th>
    </tr>
  </thead>
);
