'use client'

import React from 'react';
import { Calendar } from "@/components/ui/calendar"
import {cn} from "@/lib/utils";
import {ru} from "date-fns/locale";
import {IconLeft} from "react-day-picker";

const NewsArchive = ({className}) => {
    const [date, setDate] = React.useState(new Date())

    return (
        <div className={cn("w-[267px] rounded-md border border-[#E0EBFF] bg-white py-5 px-4", className)}>
            <h4 className="font-bold text-center">Архив новостей</h4>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ru}
            />
        </div>
    );
};

export default NewsArchive;