import React from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import NewsList from "@/components/shared/news-list";
import TopPublicationsCard from "@/components/shared/top-publications-card";
import {getMainNewsListData, getRandomBanner, getTopNewsData} from "@/lib/fetchData";
import Banner from "@/components/shared/banner";
import MainNewsCarousel from "@/components/shared/main-news-carousel";

const MainNewsLists = async () => {

    const mainNewsList = await getMainNewsListData();
    const topList = await getTopNewsData();
    const bannerImg = await getRandomBanner();

    return (
        <>
            <Banner className="h-[138px] w-full mb-6" image={bannerImg.picture}/>
            <section className="lg:flex block pb-14 gap-6">
                <div className="flex-1">
                    <MainNewsCarousel mainNewsList={mainNewsList}/>
                </div>
                <div className="lg:sticky top-0 lg:mt-0 mt-20 border border-[#E0EBFF] rounded-[8px] bg-white h-full">
                    <h4 className="md:text-sm text-[22px] mt-7 mb-4 text-center font-bold">Топ публикации</h4>
                    <TopPublicationsCard className="last:mb-8" newsList={topList}/>
                </div>
            </section>
        </>
    );
};

export default MainNewsLists;