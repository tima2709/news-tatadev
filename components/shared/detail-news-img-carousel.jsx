'use client'

import React, {useEffect, useRef, useState} from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Image from "next/image";

const DetailNewsImgCarousel = ({images}) => {

    const [api, setApi] = useState();
    const [current, setCurrent] = useState(0);
    const thumbnailsRef = useRef(null);

    const handlePreviewClick = (index) => {
        api?.scrollTo(index);
        setCurrent(index)
    };

    useEffect(() => {
        if (!api) {
            return;
        }

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    })

    useEffect(() => {
        if (thumbnailsRef.current) {
            const container = thumbnailsRef?.current;
            const thumbnail = container?.children[current];
            const thumbnailWidth = thumbnail?.offsetWidth;
            const scrollPosition = thumbnail?.offsetLeft - container?.offsetWidth / 3 + thumbnailWidth / 2;
            container.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, [current]);

    return (
        <div className="mb-8">
            <Carousel
                setApi={setApi}
                className="w-full bg-transparent"
            >
                <CarouselContent>
                    {images?.map((img, index) => (
                        <CarouselItem key={index}>
                            <div className="relative aspect-[16/10] w-full">
                                <Image
                                    src={img.file}
                                    alt={`Slide ${index + 1}`}
                                    fill
                                    className="object-cover rounded-[30px]"
                                    priority={index === 0}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {
                    images?.length >= 6 &&
                    <>
                        <CarouselPrevious className="right-10 -bottom-16 top-110"/>
                        <CarouselNext className="right-0 -bottom-16 top-110"/>
                        <span className="absolute -bottom-[4.5rem] right-1 font-medium text-sm text-[#777E98]">{`${current + 1} из ${images.length}`}</span>
                    </>
                }
            </Carousel>

            <div
                ref={thumbnailsRef}
                className={`flex relative gap-4 mt-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory ${images.length <= 5 ? 'items-center justify-center w-full' : 'max-w-[665px]'}`}
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                {images?.length !== 1 && images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => handlePreviewClick(idx)}
                        className={`relative flex-shrink-0 w-[118px] h-[72px] rounded-lg overflow-hidden transition-all snap-start ${
                            current === idx
                                ? "opacity-100"
                                : "opacity-50"
                        }`}
                    >
                        <Image
                            src={img.file}
                            alt={`Preview ${idx + 1}`}
                            fill
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DetailNewsImgCarousel;