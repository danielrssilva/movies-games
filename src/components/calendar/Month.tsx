import React, { useEffect, useRef } from "react";

interface MonthProps {
  date: Date;
  activityCount: number;
  weeksCount?: number;
  isLoading: boolean;
}

const Month: React.FC<MonthProps> = (props) => {
  const { date, activityCount, weeksCount, isLoading } = props;
  const currentMonthRef = useRef<HTMLDivElement>(null);
  const month = date?.toLocaleDateString("pt-BR", { month: "long" });

  useEffect(() => {
    if (
      currentMonthRef.current &&
      date?.getMonth() === new Date().getMonth() &&
      date?.getFullYear() === new Date().getFullYear()
    ) {
      currentMonthRef.current.scrollIntoView({
        behavior: "instant",
        block: "nearest",
        inline: "start",
      });
    }
  }, [date]);
  return (
    <div
      ref={currentMonthRef}
      className="px-2 h-full min-w-[124px] text-white uppercase flex flex-col items-center justify-center gap-2"
    >
      <h3 className=" text-[32px] font-black">{month}</h3>
      <div className="flex gap-4 text-light-grey font-semibold text-[24px]">
        <span>{isLoading ? "•" : activityCount} total</span>
        {/* <span>/</span>
                <span>{weeksCount}</span> */}
      </div>
    </div>
  );
};

export default Month;
