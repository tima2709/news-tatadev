import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";

const NewsCard = ({rubric}) => {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="my-6"
            key={rubric.slug}
        >
            <h2 className="mb-6">{rubric?.name}</h2>
            <CarouselContent className="sm:w-auto w-[287px]">
                {rubric.news.map((news) => (
                    <CarouselItem key={news.slug} className="lg:basis-1/4 md:basis-1/3 sm:basis-1/2">
                        <div
                            className="flex flex-col min-w-[165px] min-h-[288px] rounded-xl border border-[#E0EBFF] overflow-hidden bg-white cursor-pointer">
                            <div className="relative w-full lg:h-[118px] h-[174px] flex-shrink-0">
                                <Image
                                    src={news.cover_img}
                                    alt={news.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col flex-grow p-4">
                                <Link href={`/news-detail/${news.slug}`}>
                                    <h4 className="mb-2 line-clamp-3 hover:text-[#1757B9]">
                                        {news.title}
                                    </h4>
                                </Link>
                                <p className="text-sm line-clamp-2">
                                    {news.preview}
                                </p>
                            </div>
                        </div>


                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="top-5 right-12 md:flex hidden"/>
            <CarouselNext className="top-5 right-0 md:flex hidden"/>
        </Carousel>
    );
};

export default NewsCard;