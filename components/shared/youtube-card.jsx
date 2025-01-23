import React from 'react';

const YoutubeCard = ({news, file}) => {
    return (
        <>
            <div className={"md:rounded-[28px] rounded-[11px] overflow-hidden"}>
                <iframe
                    height="100%"
                    width="100%"
                    className={"aspect-video"}
                    src={news?.video_link || file}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
                </iframe>
            </div>
            {news?.title && <h3 className="mt-4 text-[#101828] cursor-default select-none">{news?.title}</h3>}
        </>
    );
};

export default YoutubeCard;