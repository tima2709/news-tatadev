import React from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Image from "next/image";

const YoutubeVideo = ({rubric}) => {
    return (
        <Carousel className="max-w-[849px] pt-5">
            <div className=" relative">
                <CarouselPrevious className="absolute top-3 right-14 transform -translate-y-1/2" />
                <CarouselNext className="absolute top-3 right-2 transform -translate-y-1/2" />
            </div>
            <CarouselContent className="flex">
                {rubric.news.map((news, idx) => (
                    <CarouselItem key={idx} className="flex-shrink-0 pl-4">
                        <Image src={news.cover_img} alt={"video"} width={849} height={472}/>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

export default YoutubeVideo;


