import React from 'react';
import TopPublicationsCard from "@/components/shared/top-publications-card";
import {getMainNewsListData, getRandomBanner, getTopNewsData} from "@/lib/fetchData";
import Banner from "@/components/shared/banner";
import VerticalNews from "@/components/shared/main-news-carousel/vertical-news";
import HorizontalNews from "@/components/shared/main-news-carousel/horizontal-news";

const MainNewsLists = async () => {

    const mainNewsList = await getMainNewsListData();
    const topList = await getTopNewsData();
    const bannerImg = await getRandomBanner();

    return (
        <>
            <Banner className="h-[138px] w-full mb-6" image={bannerImg.picture}/>
            <section className="lg:flex block gap-6">
                <div className="md:block hidden flex-1">
                    <VerticalNews mainNewsList={mainNewsList}/>
                </div>
                <div className="md:hidden block flex-1">
                    <HorizontalNews mainNewsList={mainNewsList}/>
                </div>
                <div className="lg:sticky top-0 lg:mt-0 mt-24 lg:border border-[#E0EBFF] rounded-lg lg:bg-white h-full">
                    <h4 className="md:text-sm text-[22px] mt-7 mb-4 text-center font-bold">Топ публикации</h4>
                    <TopPublicationsCard className="last:mb-8" newsList={topList}/>
                </div>
            </section>
        </>
    );
};

export default MainNewsLists;