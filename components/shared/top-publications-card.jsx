import React from 'react';
import Image from "next/image";
import {cn} from "@/lib/utils";
import Link from "next/link";

const TopPublicationsCard = async ({className, newsList}) => {
    return (
        <>
            {
                newsList?.map((news) => (
                    <Link href={`/news-detail/${news?.slug}`} key={news?.slug}>
                        <div
                            className={cn("group lg:flex block flex-col items-center lg:w-[267px] w-full mx-auto px-7 my-4", className)}>
                            <Image
                                src={news?.cover_img || '/youtube.svg'}
                                alt={news?.title}
                                width={180}
                                height={110}
                                className="group-hover:opacity-90 object-cover rounded-[8px] mb-2 lg:block hidden h-[110px] w-[180px]"
                            />
                            <p className="flex items-baseline gap-2 text-[#101828] lg:w-[180px] text-xs font-normal group-hover:text-[#1757B9] duration-200">
                                <span className="lg:hidden shrink-0 block w-2.5 h-2.5 bg-[#D1E2FF] rounded-full"></span>
                                {news?.title}
                            </p>
                        </div>
                    </Link>
                ))
            }
        </>
    );
};

export default TopPublicationsCard;