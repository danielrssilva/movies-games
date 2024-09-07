import React from 'react';

interface MonthProps {
    date: Date;
    activityCount: number;
    weeksCount: number;
}

const Month: React.FC<MonthProps> = ({ date, activityCount, weeksCount }) => {
    const month = date?.toLocaleDateString('pt-BR', { month: 'long' });
    return (
        <div className="px-2 h-[124px] text-white uppercase flex flex-col items-center justify-center gap-2">
            <h3 className=" text-[32px] font-black">{month}</h3>
            <div className="flex gap-4 text-light-grey font-semibold text-[24px]">
                <span>{activityCount}</span>
                <span>/</span>
                <span>{weeksCount}</span>
            </div>
        </div>
    )
}

export default Month;