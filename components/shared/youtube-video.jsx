import React from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link"

const YoutubeVideo = ({rubric}) => {
    return (
        <Carousel>
            <h2 className="mb-6">{rubric?.name}</h2>
            <CarouselContent className="flex">
                {rubric.news.map((news, idx) => (
                    <CarouselItem key={idx} className="flex-shrink-0 pl-4">
                        <Link href={`/${news.slug}`}>
                            <Image src={news.cover_img} alt={"video"} width={849} height={472} className="lg:rounded-[29px] rounded-[11px]"/>
                            <h3 className="mt-4 text-[#101828]">{news.title}</h3>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="top-5 right-12 md:block hidden"/>
            <CarouselNext className="top-5 right-0 md:block hidden"/>
        </Carousel>
    );
};

export default YoutubeVideo;


