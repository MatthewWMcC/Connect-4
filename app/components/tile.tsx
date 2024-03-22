"use client";

export default function Tile({
  value,
  onClick,
}: {
  value: number;
  onClick: () => void;
}) {
  const getColorFromValue = () => {
    if (value === 0) {
      return "white";
    } else if (value === 1) {
      return "yellow";
    } else {
      return "red";
    }
  };

  return (
    <div
      onClick={onClick}
      className="w-12 h-12 rounded-full"
      style={{ backgroundColor: getColorFromValue() }}
    ></div>
  );
}
