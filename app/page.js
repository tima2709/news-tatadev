import {Container} from "@/components/shared/container";
import MainNewsLists from "@/components/sections/main-news-lists";
import NewsRubrics from "@/components/sections/news-rubrics";
import WeatherExchange from "@/components/shared/weather-exchange";
import PartnersRunning from "@/components/shared/partners-running";
import RunningNews from "@/components/shared/running-news";
import React from "react";


export default function Home() {
    return (
        <>
            <RunningNews/>
            <Container>
                <WeatherExchange className="lg:hidden flex md:flex-row flex-col gap-4 md:justify-center justify-start  p-4 border border-[#E0EBFF] rounded-lg bg-white"/>
                <MainNewsLists/>
                <NewsRubrics/>
            </Container>
            <PartnersRunning/>
        </>
    );
}
