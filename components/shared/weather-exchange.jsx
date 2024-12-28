import React from 'react';
import Image from "next/image";
import {cn} from "@/lib/utils";

const WeatherExchange = ({className}) => {
    return (
        <div className={cn(className)}>
            <div className="flex items-center gap-2 mr-6 lx:mb-0 mb-2">
                <Image src="/sun.svg" alt="sun icon" width={22} height={22}/> <p className="text-[#101828] font-medium">+11 °С в Бишкеке</p>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-[5.5px] ">
                    <div className="rounded-full bg-[#E0EBFF] p-[6.8]">
                        <Image src="/ic_ruble.svg" alt="sun icon" width={15} height={15}/>
                    </div>
                    <p className="text-[#101828] font-medium">0.84</p>
                </div>
                <div className="flex items-center gap-[5.5px]">
                    <div className="rounded-full bg-[#E0EBFF] p-[6.8]">
                        <Image src="/ic_dollar.svg" alt="sun icon" width={15} height={15}/>
                    </div>
                    <p className="text-[#101828] font-medium">86.50</p>
                </div>
                <div className="flex items-center gap-[5.5px] ">
                    <div className="rounded-full bg-[#E0EBFF] p-[6.8]">
                        <Image src="/ic_euro.svg" alt="sun icon" width={15} height={15}/>
                    </div>
                    <p className="text-[#101828] font-medium">90.53</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherExchange;