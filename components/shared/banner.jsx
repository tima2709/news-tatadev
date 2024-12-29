import React from 'react';
import Image from "next/image";
import {cn} from "@/lib/utils";

const Banner = ({image, className}) => {
    return (
        <div className={cn("relative overflow-hidden rounded-lg bg-[#E0EBFF]", className)}>
            <Image src={image} alt="banner" fill className="object-cover"/>
        </div>
    );
};

export default Banner;