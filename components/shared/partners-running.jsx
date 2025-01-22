import React from 'react';
import Image from "next/image";
import {getHeaderData, getPartners} from "@/lib/fetchData";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Link from "next/link";

const PartnersRunning = async () => {

    const partners = await getPartners();
    const partnerTitle = await getHeaderData();

    return (
       <div className="flex gap-6">
           <div className="pb-12 lg:w-[calc(100%-291px)] w-full">
               <h2 className="cursor-default select-none mb-6">{partnerTitle?.partners_title}</h2>
               <Carousel
                   opts={{
                       align: "start",
                   }}
                   orientation={"horizontal"}
               >
                   <CarouselContent className="w-[290px]">
                       {partners?.map((item, index) => (
                           <CarouselItem key={index} className=" basis-full">
                               <Link href={item?.link} target="_blank">
                                   <div
                                       className="flex items-center p-2 h-[89px]  bg-white border border-[#E0EBFF] rounded-lg gap-2 overflow-hidden"
                                   >
                                       <Image
                                           src={item?.icon}
                                           alt={item?.name}
                                           width={70}
                                           height={70}
                                           className="object-cover shrink-0"
                                       />
                                       <p className="text-[#101828] font-normal text-sm text-wrap">
                                           {item?.name}
                                       </p>
                                   </div>
                               </Link>
                           </CarouselItem>
                       ))}
                   </CarouselContent>
                   <CarouselPrevious className="-top-10 right-10 md:flex hidden"/>
                   <CarouselNext className="-top-10 right-0 md:flex hidden"/>
               </Carousel>
           </div>
           <div className="lg:block hidden w-[267px] shrink-0"></div>
       </div>

    );
};

export default PartnersRunning;