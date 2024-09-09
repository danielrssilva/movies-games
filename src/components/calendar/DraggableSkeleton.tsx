const DraggableSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 relative flex items-center justify-center w-[230px] h-[105px] bg-darkest-grey rounded-lg group overflow-visible border-t-[10px] border-[#282828] animate-pulse" />
  );
};

export default DraggableSkeleton;
