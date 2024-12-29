'use client';

import React, {useEffect, useState} from 'react';
import {Calendar} from "@/components/ui/calendar";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {useRouter} from "next/navigation";
import {getDateNews} from "@/lib/fetchData";
import {ru} from "date-fns/locale/ru";

const NewsArchive = ({className, page}) => {
    const [date, setDate] = useState(new Date());
    const [contentDates, setContentDates] = useState([]);
    const router = useRouter();

    let todayDay = format(new Date(), "yyyy-MM-dd");

    useEffect(() => {
        const fetchDate = async () => {
            const data = await getDateNews(todayDay);
            setContentDates(data);
        };
        fetchDate();
    }, []);

    const datesWithContent = contentDates?.map(item => new Date(item.date));

    const handleSearchData = (selectedDate) => {
        setDate(selectedDate)
        const createdDate = format(selectedDate, "yyyy-MM-dd");
        router.push(`/${page}?date=${createdDate}`);
    };

    const hasContent = (date) => {
        return datesWithContent.some(contentDate =>
            contentDate.getDate() === date.getDate() &&
            contentDate.getMonth() === date.getMonth() &&
            contentDate.getYear() === date.getYear()
        );
    };

    return (
        <div className={cn("w-[267px] rounded-md border border-[#E0EBFF] bg-white py-5 px-4", className)}>
            <h4 className="font-bold text-center">Архив новостей</h4>
            <Calendar
                mode="single"
                selected={date}
                onSelect={handleSearchData}
                locale={ru}
                disabled={(date) =>
                    date > new Date() || date < new Date("1991-01-01")
                }
                modifiers={{hasContent: hasContent}}
                modifiersStyles={{
                    hasContent: {
                        position: 'relative'
                    }
                }}
                components={{
                    DayContent: ({date}) => (
                        <div className="relative w-full h-full flex items-center justify-center">
                            {date.getDate()}
                            {hasContent(date) && (
                                <div className="absolute bottom-1 w-1 h-1 bg-current rounded-full"/>
                            )}
                        </div>
                    )
                }}
            />
        </div>
    );
};

export default NewsArchive;
