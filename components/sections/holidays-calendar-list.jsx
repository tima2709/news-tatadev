'use client'

import React, {useEffect, useState} from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import HolidaysList from "@/components/shared/holidays-list";
import {cn} from "@/lib/utils";
import {getHolidays} from "@/lib/fetchData";
import {addMonths, format, subMonths} from "date-fns";
import {ru} from "date-fns/locale";
import Image from "next/image";

const HolidaysCalendarList = ({className}) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        const currentMonth = format(currentDate, "MM");
        getHolidays(currentMonth)
            .then((data) => setHolidays(data))
            .catch((error) => console.error("Error fetching holidays:", error));
    }, [currentDate]);

    const formattedMonth = format(currentDate, "MMMM", { locale: ru });
    const formattedYear = format(new Date, "yyyy", { locale: ru });
    const capitalizedMonth = formattedMonth.charAt(0).toUpperCase() + formattedMonth.slice(1);

    const handleNext = () => {
        setCurrentDate((prevDate) => addMonths(prevDate, 1));
    };

    const handlePrevious = () => {
        setCurrentDate((prevDate) => subMonths(prevDate, 1));
    };

    return (
        <div className={cn("bg-white border rounded-lg p-4", className)}>
            <h4 className="text-base mb-4 text-center font-bold">Праздники месяца</h4>
            <Carousel>
                <CarouselContent>
                    <CarouselItem>
                        <h4 className="text-sm mb-4 text-center font-medium">{capitalizedMonth} <span
                            className="text-[#777E98] pl-[6px]">{formattedYear}</span>
                        </h4>
                        <div className="p-1">
                            {holidays?.length > 0 ? (
                                holidays?.map((holiday) => (
                                    <HolidaysList key={holiday?.start_date} holiday={holiday}/>
                                ))
                            ) : (
                                <p>Нет праздников на этот месяц</p>
                            )}
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselNext disabled={false} className="top-3 right-0 bg-white shadow-none"
                              onClick={handleNext}>
                    <Image src={"/ic_arrow-right-gray.svg"} alt={"icon right"} width={24} height={24}/>
                </CarouselNext>
                <CarouselPrevious disabled={false} className="top-3 left-0 bg-white shadow-none"
                                  onClick={handlePrevious}>
                    <Image src={"/ic_arrow-left-gray.svg"} alt={"icon left"} width={24} height={24}/>
                </CarouselPrevious>
            </Carousel>
        </div>
    );
};

export default HolidaysCalendarList;
