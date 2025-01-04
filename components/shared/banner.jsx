import React from 'react';
import Image from "next/image";
import {cn} from "@/lib/utils";

const Banner = ({image, className}) => {
    return (
        <div className={cn("relative overflow-hidden rounded-lg bg-[#E0EBFF]", className)}>
            {image && image.length
                ? <Image src={image} alt="banner" fill className="object-cover"/>
                : <div className="bg-[#E0EBFF] flex items-center justify-center h-full w-full">
                    <p className="font-medium text-sm">Место под рекламный баннер</p>
                </div>

            }
        </div>
    );
};

export default Banner;