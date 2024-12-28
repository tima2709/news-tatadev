import React from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import HolidaysList from "@/components/shared/holidays-list";
import {cn} from "@/lib/utils";

const HolidaysCalendarList = ({className}) => {
    return (
        <div className={cn("w-[267px] bg-white border rounded-lg p-4", className)}>
            <h4 className="text-base mb-4 text-center font-bold">Праздники месяца</h4>
            <Carousel>
                <CarouselContent>
                    {Array.from({length: 12}).map((_, idx) => (
                        <CarouselItem key={idx}>
                            <div className="p-1">
                                <HolidaysList/>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className="top-3 right-0 bg-white shadow-none"/>
                <CarouselPrevious className="top-3 left-0 bg-white shadow-none"/>
            </Carousel>
        </div>
    );
};

export default HolidaysCalendarList;