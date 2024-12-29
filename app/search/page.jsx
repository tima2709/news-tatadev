import React from 'react';
import {Container} from "@/components/shared/container";
import SearchInput from "@/components/shared/search-input";
import NewsList from "@/components/shared/news-list";
import {getRandomBanner, getRubrics, getSearchedData} from "@/lib/fetchData";
import Image from "next/image";
import NewsArchive from "@/components/shared/news-archive";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import Banner from "@/components/shared/banner";

const Page = async ({searchParams}) => {

    const query = await searchParams;
    const slug = Object.values(query).join('');
    const keyOfQuery = Object.keys(query).join('');

    const searchData = await getSearchedData(`${keyOfQuery}=${slug}`);
    const rubrics = await getRubrics();
    const bannerImg = await getRandomBanner();

    const rubric = rubrics.find(item => item.slug === slug);

    let formattedDate = null;

    if (!isNaN(Date.parse(slug))) {
        const dateObject = new Date(slug);
        formattedDate = format(dateObject, "d MMMM", {locale: ru});
    }


    return (
        <Container>
            {
                keyOfQuery === "search" &&
                <div className="pt-6">
                    <SearchInput className="mb-6"/>
                </div>
            }
            <div className="flex gap-6 pb-10">
                <div className="flex-1">
                    <div className="mb-6">
                        <h2 className="mb-4">
                            {keyOfQuery === "search"
                                ? "Результаты поиска"
                                : keyOfQuery === "date"
                                    ? formattedDate
                                    : rubric?.title}
                        </h2>
                        {keyOfQuery === "search" && (
                            searchData?.results?.length > 0 ? (
                                <p className="font-normal text-base text-[#101828]">
                                    Показаны {searchData.count >= 10 ? 10 : searchData.count} результатов
                                    из {searchData.count} с совпадением по запросу
                                    <span className="font-medium text-base"> {slug}</span>
                                </p>
                            ) : (
                                <p className="font-normal text-base text-[#101828]">
                                    По данному запросу ничего не найдено. Попробуйте ввести запрос иначе
                                </p>
                            )
                        )}
                    </div>
                    <div>
                        {searchData?.results.length
                            ? searchData?.results?.map((news) => (
                                <NewsList key={news.slug} news={news} className="mb-6"/>
                            ))
                            :
                            <Image
                                src="/image_nothing-found.png"
                                alt={'image nothing found'}
                                width={360}
                                height={360}
                                className="mt-11"
                            />
                        }
                    </div>
                </div>
                {
                    keyOfQuery === 'date'
                        ? <div className="mt-[55px] lg:block hidden">
                            <NewsArchive page="search"/>
                        </div>
                        :
                        <div
                            className="lg:flex hidden">
                            <Banner className="h-[436px] w-[267px] mb-6 mt-[55px] rounded-lg bg-[#E0EBFF]"
                                    image={bannerImg?.side_picture}/>
                        </div>
                }
            </div>
        </Container>
    );
};

export default Page;