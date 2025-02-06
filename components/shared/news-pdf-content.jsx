'use client'

import React from 'react';
import NewsMagazineCard from "@/components/shared/news-magazine-card";
import {format} from "date-fns";
import {ru} from "date-fns/locale/ru";
import Image from "next/image";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"
import Link from "next/link"

const NewsPdfContent = ({pdfNewsFiles, pdfNewsYears, slug}) => {

    const month = (month) => {
        let formattedDate = format(month, "LLLL yyyy", {locale: ru})
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return (
        <div>
            <div>
                {pdfNewsFiles && pdfNewsFiles?.length
                    ? pdfNewsFiles?.map((el, index) => (
                        <div key={index} className="mb-5">
                            <h4 className="font-medium text-xl mb-4">{month(el.month)}</h4>
                            <div
                                className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-6 md:gap-3 gap-2">
                                {
                                    el?.items.map((item, index) => (
                                        <NewsMagazineCard key={index} pdfUrl={item}/>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                    : <div>
                        <Image
                            src="/image_nothing-found.png"
                            alt="image nothing found"
                            width={360}
                            height={360}
                            className="mt-11"
                        />
                    </div>}
            </div>

            <div className="flex items-center justify-center mt-20">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                >
                    <CarouselContent className="sm:max-w-[281px] max-w-[250px] w-full">
                        {
                            pdfNewsYears?.map((year) => (
                                <Link key={year} href={`/archive-releases/${year}`}>
                                    <CarouselItem className="md:basis-1/5 basis-1/3">
                                        <p className={`text-[#1757B9] text-sm font-medium py-[7px] px-[10px] ${slug == year ? "bg-[#E0EBFF] rounded-lg" : ""}`}>{year}</p>
                                    </CarouselItem>
                                </Link>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious className="flex top-[16px] sm:left-[-48px] left-[-38px] bg-[#E0EBFF] rounded-lg"/>
                    <CarouselNext className="flex top-[16px] bg-[#E0EBFF] rounded-lg"/>
                </Carousel>
            </div>

        </div>
    );
};

export default NewsPdfContent;