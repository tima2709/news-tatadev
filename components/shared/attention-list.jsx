import React from 'react';
import Image from "next/image";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import Link from "next/link";

const AttetionList = ({news, className, pathName, title}) => {

    const createdDate = format(news?.created_at, "dd.MM.yyyy")

    return (
        <Link href={`/${pathName}/${news.slug}`}>
            <div className={cn("md:flex group rounded-[8px] border border-[#E0EBFF] overflow-hidden bg-white", className)}>
                <div className="sm:w-full md:w-[32%]">
                    <Image
                        src={news?.cover_img?.length ? news.cover_img : "/vacancy-default-image.png"}
                        alt="img"
                        width={267}
                        height={163}
                        className="object-cover group-hover:opacity-90 lg:rounded-l-[8px] w-full md:h-full h-[237px]"
                    />
                </div>
                <div className="sm:w-full md:w-[68%] p-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-[#1757B9]">{title}</span>
                        <span className="font-normal text-xs text-[#777E98]">{createdDate}</span>
                    </div>

                    <h4 className="mb-2 line-clamp-2 transition duration-200 group-hover:text-[#1757B9]">{news?.title}</h4>

                    <p className="md:line-clamp-3 line-clamp-2 md:text-sm text-xs text-[#777E98]">{news.preview}</p>
                </div>
            </div>
        </Link>
    );
};

export default AttetionList;