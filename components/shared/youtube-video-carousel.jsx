import React from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Link from "next/link"
import YoutubeCard from "@/components/shared/youtube-card";

const YoutubeVideoCarousel = ({rubric}) => {
    return (
        <Carousel>
            <h2 className="mb-6 md:text-[26px] text-[22px]">
                <Link href={`/search/?rubric=${rubric.slug}&page=1`}><span className="hover:text-[#1757B9] duration-200">{rubric?.name}</span></Link>
            </h2>
            <CarouselContent className="flex">
                {rubric.news.map((news, idx) => (
                    <CarouselItem key={idx} className="flex-shrink-0 pl-4">
                        <YoutubeCard news={news}/>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="top-5 right-12 md:flex hidden"/>
            <CarouselNext className="top-5 right-0 md:flex hidden"/>
        </Carousel>
    );
};

export default YoutubeVideoCarousel;


