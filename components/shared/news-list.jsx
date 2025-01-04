import React from 'react';
import Image from "next/image";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import Link from "next/link";

const NewsList = ({news, className}) => {

    const createdDate = format(news?.created_at, "dd.MM.yyyy")

    return (
        <Link href={`/news-detail/${news.slug}`}>
            <div
                className={cn("group md:flex rounded-[8px] md:h-[163px] border border-[#E0EBFF] overflow-hidden bg-white", className)}>
                <div className="w-auto md:w-[32%] md:h-[163px] h-[237px]">
                    <Image src={news.cover_img} alt={"img"} width={267} height={163}
                           className="group-hover:opacity-90 duration-200 cursor-pointer object-cover lg:rounded-l-[8px] h-full w-full "/>
                </div>
                <div className="w-auto md:w-[68%] p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[#1757B9] font-semibold text-base">{news?.rubric?.title}</span>
                        <span className="font-normal text-xs text-[#777E98]">{createdDate}</span>
                    </div>

                    <h4 className="mb-2 line-clamp-2 transition hover:duration-700 group-hover:text-[#1757B9]">{news?.title}</h4>

                    <p className="md:line-clamp-3 line-clamp-2 md:text-sm text-xs text-[#777E98]">{news.preview}</p>
                </div>
            </div>
        </Link>
    );
};

export default NewsList;