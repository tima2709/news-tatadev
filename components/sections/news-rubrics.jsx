import React from 'react';
import HolidaysCalendarList from "@/components/sections/holidays-calendar-list";
import AllRubricsNews from "@/components/shared/new-card/all-rubrics-news";
import NewsArchive from "@/components/shared/news-archive";
import {getRandomBanner, getRubricsForMainPage} from "@/lib/fetchData";
import Banner from "@/components/shared/banner";
import OurMagazine from "@/components/shared/our-magazine";

const NewsRubrics = async () => {

    const rubrics = await getRubricsForMainPage();

    const bannerImg = await getRandomBanner();


    return (
        <section className="flex lg:mt-16 lm:mt-12 gap-6">
            <AllRubricsNews rubrics={rubrics}/>
            <div className="lg:block hidden w-[267px] flex-shrink-0">
                <OurMagazine className="mt-[100px]"/>
                <HolidaysCalendarList className="mb-5 mt-5 w-[267px]"/>
                <NewsArchive className="mb-5" page="search"/>
                <Banner className="h-[436px] w-full mb-6" image={bannerImg?.side_picture} link={bannerImg?.link}/>
            </div>
        </section>
    );
};

export default NewsRubrics;