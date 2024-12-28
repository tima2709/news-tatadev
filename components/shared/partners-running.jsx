import React from 'react';
import {cn} from "@/lib/utils";
import Image from "next/image";

const PartnersRunning = ({className}) => {

    const partners = [
        {
            image: "/partner-logo1.svg",
            title: "Государственный комитет национальной безопасности КР"
        },
        {
            image: "/partner-logo2.svg",
            title: "Кабинет Министров Кыргызской республики"
        },
        {
            image: "/partner-logo1.svg",
            title: "Государственный комитет национальной безопасности КР"
        },
        {
            image: "/partner-logo2.svg",
            title: "Кабинет Министров Кыргызской республики"
        },
        {
            image: "/partner-logo1.svg",
            title: "Государственный комитет национальной безопасности КР"
        },
        {
            image: "/partner-logo2.svg",
            title: "Кабинет Министров Кыргызской республики"
        },
        {
            image: "/partner-logo2.svg",
            title: "Кабинет Министров Кыргызской республики"
        },
        {
            image: "/partner-logo1.svg",
            title: "Государственный комитет национальной безопасности КР"
        },
        {
            image: "/partner-logo2.svg",
            title: "Кабинет Министров Кыргызской республики"
        },

    ]

    return (
        <div className={cn("w-full overflow-hidden bg-[#E0EBFF] py-[21px]", className)}>
            <div className="flex gap-6 animate-[ticker_20s_linear_infinite]">
                {partners.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center p-2 w-[270px] bg-white border border-[#E0EBFF] rounded-lg gap-2 flex-shrink-0"
                    >
                        <Image src={item.image} alt={"logo"} width={73} height={73} />
                        <p className="text-[#101828] font-normal text-sm text-wrap">{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PartnersRunning;