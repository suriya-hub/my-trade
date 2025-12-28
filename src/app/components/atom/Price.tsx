interface PriceProps {
  value: number;
}

export const Price = ({ value }: PriceProps) => {
  return <span>${value.toFixed(2)}</span>;
};
