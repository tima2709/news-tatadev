import React from 'react';
import HolidaysCalendarList from "@/components/sections/holidays-calendar-list";
import AllRubricsNews from "@/components/shared/new-card/all-rubrics-news";
import NewsArchive from "@/components/shared/news-archive";
import {getRandomBanner, getRubrics} from "@/lib/fetchData";
import Banner from "@/components/shared/banner";

const NewsRubrics = async () => {

    const rubrics = await getRubrics();

    const bannerImg = await getRandomBanner();

    return (
        <section className="flex mt-9 gap-6">
            <AllRubricsNews rubrics={rubrics}/>
            <div className="lg:block hidden w-[267px] flex-shrink-0">
                <HolidaysCalendarList className="mb-5 mt-20 w-[267px]"/>
                <NewsArchive className="mb-5" page="search"/>
                <Banner className="h-[436px] w-full mb-6" image={bannerImg?.side_picture}/>
            </div>
        </section>
    );
};

export default NewsRubrics;