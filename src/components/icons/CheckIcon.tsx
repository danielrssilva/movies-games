const CheckIcon = ({
  className = "",
  color = "#FFFFFF",
  size = 22,
}: {
  className?: string;
  color?: string;
  size?: 22 | 24 | 32 | 42;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 11L8 16"
        stroke={color}
        stroke-linecap="round"
        className={className}
      />
      <path
        d="M8 16L19 5"
        stroke={color}
        stroke-linecap="round"
        className={className}
      />
    </svg>
  );
};

export default CheckIcon;
