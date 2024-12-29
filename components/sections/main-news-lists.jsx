import React from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import NewsList from "@/components/shared/news-list";
import TopPublicationsCard from "@/components/shared/top-publications-card";
import {getMainNewsListData, getRandomBanner, getTopNewsData} from "@/lib/fetchData";
import Banner from "@/components/shared/banner";

const MainNewsLists = async () => {

    const mainNewsList = await getMainNewsListData();
    const topList = await getTopNewsData();
    const bannerImg = await getRandomBanner();

    return (
        <section className="lg:flex block pb-14 gap-6">
           <div className="flex-1">
               <Banner className="h-[138px] w-full mb-6" image={bannerImg.picture}/>
               <Carousel
                   opts={{
                       align: "start",
                   }}
                   orientation="vertical"
               >
                   <CarouselContent className="md:max-h-[1140px] max-h-[1215px] ">
                       {mainNewsList.map((news) => (
                           <CarouselItem key={news.slug} className="basis-1">
                               <div className="md:p-0 pt-1">
                                   <NewsList news={news}/>
                               </div>
                           </CarouselItem>
                       ))}
                   </CarouselContent>
                   <CarouselPrevious  className="md:-bottom-12 -bottom-10 left-4 "/>
                   <CarouselNext  className="md:-bottom-12 -bottom-10 left-14"/>
               </Carousel>
           </div>
            <div className="lg:sticky top-0 lg:mt-0 mt-20 border border-[#E0EBFF] rounded-[8px] bg-white h-full">
                <h4 className="md:text-sm text-[22px] mt-7 mb-4 text-center font-bold">Топ публикации</h4>
                    <TopPublicationsCard className="last:mb-8" newsList={topList}/>
            </div>
        </section>
    );
};

export default MainNewsLists;