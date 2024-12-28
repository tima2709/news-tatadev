import React from 'react';
import HolidaysCalendarList from "@/components/sections/holidays-calendar-list";
import AllRubricsNews from "@/components/shared/new-card/all-rubrics-news";
import NewsArchive from "@/components/shared/news-archive";
import {getRubrics} from "@/lib/fetchData";

const NewsRubrics = async () => {

    const rubrics = await getRubrics();

    return (
        <section className="flex mt-9 gap-6">
            <AllRubricsNews rubrics={rubrics}/>
            <div className="lg:block hidden w-[267px] flex-shrink-0">
                <HolidaysCalendarList className="mb-5 mt-20"/>
                <NewsArchive className="mb-5"/>
            </div>
        </section>
    );
};

export default NewsRubrics;