const CollapseButton = (props: {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}) => {
  const { isCollapsed, setIsCollapsed } = props;
  return (
    <button
      type="button"
      onClick={() => setIsCollapsed(!isCollapsed)}
      className="text-white hover:text-gray-300 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 transition-transform duration-300 ${
          isCollapsed ? "" : "rotate-180"
        }`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
};

export default CollapseButton; 
