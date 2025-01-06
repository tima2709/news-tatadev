import React from 'react';
import Image from "next/image";
import {getHeaderData, getPartners} from "@/lib/fetchData";

const PartnersRunning = async () => {

    const partners = await getPartners();
    const partnerTitle = await getHeaderData();

    return (
        <div className="pb-12">
            <h2 className="mb-6 max-w-[1440px] m-auto xl:px-[150px] lg:px-20 md:px-12 px-5 cursor-default select-none">{partnerTitle?.partners_title}</h2>
            <div className={"w-full overflow-hidden bg-[#E0EBFF] py-[21px]"}>
                <div className="flex gap-6 animate-[ticker_20s_linear_infinite]">
                    {Array.from({ length: partners?.length < 10 ? 10 : partners.length }).map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center p-2 w-[270px] bg-white border border-[#E0EBFF] rounded-lg gap-2 flex-shrink-0"
                        >
                            <Image
                                src={partners[index % partners.length]?.icon}
                                alt={partners[index % partners.length]?.name}
                                width={73}
                                height={73}
                                className="object-contain"
                            />
                            <p className="text-[#101828] font-normal text-sm text-wrap">
                                {partners[index % partners.length]?.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default PartnersRunning;