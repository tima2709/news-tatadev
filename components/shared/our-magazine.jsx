import React from 'react';
import NewsMagazineCard from "@/components/shared/news-magazine-card";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {getLatestNewsPdf} from "@/lib/fetchData";
import {format} from "date-fns";
import {cn} from "@/lib/utils"

const OurMagazine = async ({className}) => {

    const latestPdfNews = await getLatestNewsPdf();

    const currentYear = format(latestPdfNews?.publish_date, "yyyy");

    return (
       <>
           {latestPdfNews?.pdf_file &&
               <div className={cn("flex flex-col gap-4 justify-center bg-white border border-[#E0EBFF] py-4 px-5 rounded-lg", className)}>
                   <h4 className="text-center font-bold">Наша газета</h4>
                   <NewsMagazineCard pdfUrl={latestPdfNews} className="w-[227px] h-[324px]" type="main"/>
                   <Link href={`/archive-releases/${currentYear}`}>
                       <Button variant="ghost" className="text-[#101828] font-medium text-sm border border-[#E0EBFF] rounded-lg py-[18px] w-full h-full">Архив выпусков</Button>
                   </Link>
               </div>
           }
       </>
    );
};

export default OurMagazine;