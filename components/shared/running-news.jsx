import React from 'react';
import {cn} from "@/lib/utils";
import {getUrgentNewsList} from '@/lib/fetchData';


const RunningNews = async ({className}) => {
    const urgentList = await getUrgentNewsList("6");

    return (
        <>
            {urgentList ?
                <div className={cn("w-full overflow-hidden bg-[#E0EBFF]", className)}>
                    <div className="relative whitespace-nowrap animate-[ticker_20s_linear_infinite]">
                        <div className="inline-block">
                            {urgentList?.map((item) => (
                                <span key={item.slug} className="inline-block text-[#1757B9] font-semibold py-2">
              <span className="px-4">•</span> {item.title}
            </span>
                            ))}
                        </div>
                    </div>
                </div>
            : <></>
            }
        </>
    );
};

export default RunningNews;