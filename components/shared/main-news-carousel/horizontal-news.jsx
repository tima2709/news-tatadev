import React from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import NewsList from "@/components/shared/news-list";

const HorizontalNews = ({mainNewsList}) => {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            orientation={"horizontal"}
        >
            <CarouselContent className="sm:w-auto w-[290px]">
                {mainNewsList?.map((news) => (
                    <CarouselItem key={news.slug} className="sm:basis-1/2">
                        <div className="md:p-0 pt-1">
                            <NewsList news={news}/>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="md:flex hidden md:-bottom-12 -bottom-11 left-4 "/>
            <CarouselNext className="md:flex hidden md:-bottom-12 -bottom-11 left-14"/>
        </Carousel>
    );
};

export default HorizontalNews;