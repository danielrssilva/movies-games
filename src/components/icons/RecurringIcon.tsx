const RecurringIcon = ({
  className = '',
  color = "#1D1D1D",
  size = 20,
}: {
  className?: string;
  color?: string;
  size?: 20 | 24 | 32;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.33341 14.1666H6.66748C3.90606 14.1666 1.66748 11.928 1.66748 9.16663C1.66748 6.4052 3.90606 4.16663 6.66748 4.16663H13.3334C16.0948 4.16663 18.3334 6.4052 18.3334 9.16663C18.3334 11.928 16.0948 14.1666 13.3334 14.1666H11.6667M11.6667 14.1666L14.1667 16.6666M11.6667 14.1666L14.1667 11.6666"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      />
    </svg>
  );
};

export default RecurringIcon;
