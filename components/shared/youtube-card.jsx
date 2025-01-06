import React from 'react';
import {cn} from "@/lib/utils";

const YoutubeCard = ({news, className}) => {
    return (
        <div className={cn(className)}>
            <div className={"md:rounded-[28px] rounded-[11px] overflow-hidden"}>
                <iframe
                    height="100%"
                    width="100%"
                    className="aspect-video	"
                    src={news?.video_link}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                </iframe>
            </div>
            <h3 className="mt-4 text-[#101828] cursor-default select-none">{news.title}</h3>
        </div>
    );
};

export default YoutubeCard;