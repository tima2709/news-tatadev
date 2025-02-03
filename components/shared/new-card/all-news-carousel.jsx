import React from 'react';
import Link from "next/link";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Image from "next/image";
import {getSearchedData} from "@/lib/fetchData";

const AllNewsCarousel = async () => {

    const allNews = await getSearchedData("rubric_type=article");

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="lg:mt-20 lm:mt-12"
        >
            <h2
                className="mb-6 md:text-[26px] text-[22px]">
                <Link href={`/search/?rubric_type=article&page=1`}><span className="hover:text-[#1757B9] duration-200">Все новости</span></Link>
            </h2>
            <CarouselContent className="sm:w-auto w-[287px]">
                {allNews?.results?.map((news) => (
                    <CarouselItem key={news?.slug} className="lx:basis-1/4 md:basis-1/3 sm:basis-1/2">
                        <Link href={`/news-detail/${news?.slug}`}>
                            <div
                                className="group flex flex-col min-w-[165px] min-h-[288px] h-full rounded-xl border border-[#E0EBFF] overflow-hidden bg-white cursor-pointer">
                                <div className="relative w-full lg:h-[118px] h-[174px] flex-shrink-0">
                                    <Image
                                        src={news?.cover_img}
                                        alt={news?.title}
                                        fill
                                        className="object-cover group-hover:opacity-90 duration-200"
                                    />
                                </div>
                                <div className="flex flex-col flex-grow p-4">

                                    <h4 className="mb-2 group-hover:text-[#1757B9]">
                                        {news?.title}
                                    </h4>

                                    <p className="text-sm line-clamp-3 text-[#777E98]">
                                        {news?.preview}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="top-5 right-10 md:flex hidden"/>
            <CarouselNext className="top-5 right-0 md:flex hidden"/>
        </Carousel>
    );
};

export default AllNewsCarousel;