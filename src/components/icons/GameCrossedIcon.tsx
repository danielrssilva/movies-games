const GameCrossedIcon = ({
  className,
  color = "#ACACAC",
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
    >
      <path
        d="M6.66667 7.08333C6.66667 6.6231 6.29357 6.25 5.83333 6.25C5.37309 6.25 5 6.6231 5 7.08333V7.5H4.58333C4.12309 7.5 3.75 7.87309 3.75 8.33333C3.75 8.79358 4.12309 9.16667 4.58333 9.16667H5V9.58333C5 10.0436 5.37309 10.4167 5.83333 10.4167C6.29357 10.4167 6.66667 10.0436 6.66667 9.58333V9.16667H7.08333C7.54357 9.16667 7.91667 8.79358 7.91667 8.33333C7.91667 7.87309 7.54357 7.5 7.08333 7.5H6.66667V7.08333Z"
        fill={color}
      />
      <path
        d="M14.1668 10.8333C14.6271 10.8333 15.0001 10.4603 15.0001 10C15.0001 9.53976 14.6271 9.16667 14.1668 9.16667C13.7066 9.16667 13.3335 9.53976 13.3335 10C13.3335 10.4603 13.7066 10.8333 14.1668 10.8333Z"
        fill={color}
      />
      <path
        d="M15.8333 9.16667C16.2936 9.16667 16.6667 8.79358 16.6667 8.33333C16.6667 7.87309 16.2936 7.5 15.8333 7.5C15.3731 7.5 15 7.87309 15 8.33333C15 8.79358 15.3731 9.16667 15.8333 9.16667Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.67173 12.9879H11.7371C12.0754 12.9879 12.4348 13.2056 12.6371 13.5919C12.9 14.0937 13.2691 14.7104 13.7329 15.2522C14.1865 15.7823 14.7981 16.3202 15.5635 16.5344C16.7589 16.8689 17.795 16.3406 18.4493 15.5567C19.0904 14.7887 19.4397 13.7087 19.3523 12.6602C19.2683 11.6526 19.1889 10.6021 19.1529 9.85033C19.1024 8.80183 18.8826 7.54946 18.6583 6.49025C18.6108 6.26623 18.5474 6.0491 18.4692 5.83993L17.0592 6.98556C17.2658 7.98104 17.4464 9.06238 17.4881 9.93033C17.5257 10.7133 17.6072 11.7886 17.6914 12.7987C17.7426 13.413 17.5284 14.059 17.1697 14.4888C16.824 14.903 16.424 15.0445 16.0127 14.9294C15.708 14.8441 15.3605 14.5908 14.999 14.1684C14.6475 13.7578 14.3453 13.2609 14.1134 12.8185C13.6702 11.9723 12.7901 11.3212 11.7371 11.3212H11.723L9.67173 12.9879ZM12.4257 4.30793C11.5814 4.22353 10.7379 4.16667 9.99988 4.16667C8.61392 4.16667 6.85612 4.36719 5.41891 4.57408C4.19573 4.75016 3.22401 5.64574 2.97203 6.83556C2.75266 7.87137 2.55555 9.01858 2.51174 9.93033C2.4777 10.6388 2.40779 11.5865 2.33239 12.5088L0.722044 13.8172C0.642538 13.4387 0.615273 13.0473 0.647548 12.6602C0.73157 11.6526 0.810874 10.6021 0.846994 9.85033C0.897369 8.80183 1.1172 7.54946 1.34153 6.49025C1.74239 4.59747 3.2858 3.1973 5.18144 2.92442C6.63523 2.71514 8.48984 2.5 9.99988 2.5C11.3125 2.5 12.8855 2.66256 14.2293 2.84253L12.4257 4.30793Z"
        fill={color}
      />
      <path
        className={className}
        d="M2 16L18 3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default GameCrossedIcon;
