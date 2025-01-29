import React from 'react';
import NewsMagazineCard from "@/components/shared/news-magazine-card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {getLatestNewsPdf} from "@/lib/fetchData";
import {format} from "date-fns";
import {cn} from "@/lib/utils"

const OurMagazine = async ({className, cardClass}) => {

    const latestPdfNews = await getLatestNewsPdf();

    const currentYear = format(latestPdfNews?.publish_date, "yyyy");

    return (
       <>
           {latestPdfNews?.pdf_file &&
               <div className={cn("lg:bg-white bg-transparent lg:border border-none border-[#E0EBFF] py-4 px-5 rounded-lg", className)}>
                   <div className="flex flex-col gap-4 justify-center sm:items-center mb-4">
                       <h4 className="md:text-center lg:text-base text-[22px] text-left font-bold">Наша газета</h4>
                       <NewsMagazineCard pdfUrl={latestPdfNews} className={cn("w-[227px] h-[324px]", cardClass)} type="main"/>
                   </div>
                   <Link href={`/archive-releases/${currentYear}`} className="flex items-center justify-center">
                       <Button variant="ghost" className="text-[#101828] max-w-[388px] font-medium text-sm border border-[#E0EBFF] rounded-lg py-[18px] w-full h-full">Архив выпусков</Button>
                   </Link>
               </div>
           }
       </>
    );
};

export default OurMagazine;