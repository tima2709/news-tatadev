'use client';

import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { ru } from "date-fns/locale";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const NewsArchive = ({ className }) => {
    const [date, setDate] = React.useState(new Date());
    const router = useRouter();

    const handleSearchData = (selectedDate) => {
        const createdDate = format(selectedDate, "yyyy-MM-dd");
        router.push(`/search?date=${createdDate}`);
    };

    const handleDateSelect = (selectedDate) => {
        if (selectedDate) {
            setDate(selectedDate);
            handleSearchData(selectedDate);
        }
    };

    return (
        <div className={cn("w-[267px] rounded-md border border-[#E0EBFF] bg-white py-5 px-4", className)}>
            <h4 className="font-bold text-center">Архив новостей</h4>
            <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                locale={ru}
                disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                }
            />
        </div>
    );
};

export default NewsArchive;
