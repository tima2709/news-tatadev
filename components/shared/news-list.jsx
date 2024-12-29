import React from 'react';
import Image from "next/image";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import Link from "next/link";

const NewsList = ({news, className}) => {

    const createdDate = format(news?.created_at, "dd.MM.yyyy")

    return (
        <div className={cn("md:flex rounded-[8px] border border-[#E0EBFF] overflow-hidden bg-white", className)}>
            <div className="sm:w-full md:w-[32%]">
                <Image src={news.cover_img} alt={"img"} width={267} height={163} className="object-cover lg:rounded-l-[8px] w-full md:h-[163px] h-[237px]"/>
            </div>
            <div className="sm:w-full md:w-[68%] p-4">
                <div className="flex justify-between items-center mb-2">
                    <Link href={`/search?rubric=${news.rubric?.slug}`}><span className="text-[#1757B9]">{news?.rubric?.title}</span></Link>
                    <span className="font-normal text-xs text-[#777E98]">{createdDate}</span>
                </div>
                <Link href={`/${news.slug}`}>
                    <h4 className="mb-2 line-clamp-2 transition hover:duration-700 hover:text-[#1757B9]">{news?.title}</h4>
                </Link>
                <p className="md:line-clamp-3 line-clamp-2 md:text-sm text-xs text-[#777E98]">{news.preview}</p>
            </div>
        </div>
    );
};

export default NewsList;