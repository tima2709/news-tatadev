import React from 'react';
import Image from "next/image";
import {cn} from "@/lib/utils";
import { getWeather, exchangeRates } from '@/lib/fetchData';

const WeatherExchange = async ({className}) => {
    const weather = await getWeather().catch((error) => console.error(error));
    const rates = await exchangeRates();

    return (
        <div className={cn(className)}>
            <div className="flex items-center gap-2 mr-6 lx:mb-0 mb-2">
                <Image src="/sun.svg" alt="sun icon" width={22} height={22}/> 
                <p className="text-[#101828] font-medium">
                    {weather?.current_weather?.temperature} {weather?.current_weather_units?.temperature} в Бишкеке
                </p>
            </div>
            <div className="flex items-center gap-6">
                {
                    rates.map((item) => (
                        <div className="flex items-center gap-[5.5px] ">
                            <div className="rounded-full bg-[#E0EBFF] p-[6.8]">
                                <Image src={item?.target_currency?.icon} alt="currency icon" width={15} height={15}/>
                            </div>
                            <p className="text-[#101828] font-medium">{item?.price_per}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default WeatherExchange;