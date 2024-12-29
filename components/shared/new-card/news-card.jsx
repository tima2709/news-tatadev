import React from 'react';
import Image from "next/image";
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
            <CarouselContent>
                {rubric.news.map((news) => (
                    <CarouselItem key={news.slug} className="lg:basis-1/4 md:basis-1/3 sm:basis-1/2">
                        <div className="">
                            <div className="rounded-xl border border-[#E0EBFF] overflow-hidden bg-white cursor-pointer">
                                <div className="">
                                    <Image
                                        src={news.cover_img}
                                        alt={"Новости"}
                                        width={194}
                                        height={118}
                                        priority
                                        className="object-cover w-full"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-[#1757B9]">
                                        {news.title}
                                    </h2>
                                    <p className="text-sm line-clamp-4">{news.preview}</p>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="top-5 right-12"/>
            <CarouselNext className="top-5 right-0"/>
        </Carousel>
    );
};

export default NewsCard;