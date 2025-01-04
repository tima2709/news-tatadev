import React from 'react';
import Image from "next/image";
import {cn} from "@/lib/utils";
import { getWeather, getExchangesRates } from '@/lib/fetchData';

const WeatherExchange = async ({className}) => {

    const exchangesRate = await getExchangesRates()

    const weather = await getWeather().catch((error) => console.error(error));

    return (
        <div className={cn(className)}>
            <div className="flex items-center gap-2 mr-6 lx:mb-0 md:mb-2 mb-0 ">
                <Image src="/sun.svg" alt="sun icon" width={22} height={22}/>
                <p className="text-[#101828] font-medium">
                    {weather?.current_weather?.temperature} {weather?.current_weather_units?.temperature} в Бишкеке
                </p>
            </div>
            <div className="flex items-center gap-6">
                {exchangesRate?.map((rate) => (
                    <div key={rate?.price_per} className="flex items-center gap-[5.5px] ">
                        <div className="rounded-full bg-[#E0EBFF] p-[6.8]">
                            <Image src={rate.target_currency.icon} alt="icon" width={28} height={28}/>
                        </div>
                        <p className="text-[#101828] font-medium">{rate.price_per}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherExchange;