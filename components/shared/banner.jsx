import React from 'react';
import Image from "next/image";
import {cn} from "@/lib/utils";

const Banner = ({image, className, link}) => {
    return (
        <div className={cn("relative overflow-hidden rounded-lg bg-[#E0EBFF]", className)}>
            {image && image?.length
                ? <a href={link}  target="_blank"><Image src={image} alt="banner" fill className="object-cover hover:brightness-90 duration-500"/></a>
                : <div className="bg-[#E0EBFF] flex items-center justify-center h-full w-full cursor-default">
                    <p className="font-medium text-sm cursor-default">Место под рекламный баннер</p>
                </div>

            }
        </div>
    );
};

export default Banner;