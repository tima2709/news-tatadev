import React from 'react';
import Image from "next/image";
import {cn} from "@/lib/utils";
import Link from "next/link";

const TopPublicationsCard = async ({className, newsList}) => {
    return (
        <>
            {
                newsList?.map((news) => (
                    <div key={news?.slug} className={cn("lg:flex block flex-col items-center lg:w-[267px] w-full mx-auto px-7 my-4", className)}>
                        <Image
                            src={news?.cover_img}
                            alt={news?.title}
                            width={180}
                            height={110}
                            className="object-cover rounded-[8px] mb-2 lg:block hidden h-[110px] w-[180px]"
                        />
                        <Link href={`/news-detail/${news?.slug}`}>
                            <p className="flex items-center gap-2 text-[#101828] lg:w-[180px] text-xs font-normal hover:text-[#1757B9]">
                                <span className="lg:hidden block w-2.5 h-2.5 bg-[#D1E2FF] rounded-full"></span>
                                {news?.title}
                            </p>
                        </Link>
                    </div>
                ))
            }
        </>
    );
};

export default TopPublicationsCard;