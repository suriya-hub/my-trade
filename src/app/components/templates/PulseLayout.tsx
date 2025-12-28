import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PulseLayout = ({ children }: Props) => (
  <div className="max-w-6xl mx-auto p-4">
    <h1 className="text-xl font-bold mb-4">Axiom Trade - Pulse</h1>
    {children}
  </div>
);
