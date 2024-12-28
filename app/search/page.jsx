import React from 'react';
import {Container} from "@/components/shared/container";
import SearchInput from "@/components/shared/search-input";
import NewsList from "@/components/shared/news-list";
import {getRubrics, getSearchedData} from "@/lib/fetchData";
import Image from "next/image";
import NewsArchive from "@/components/shared/news-archive";

const Page = async ({searchParams}) => {

    const query = await searchParams;

    const searchData = await getSearchedData(`${Object.keys(query)}=${Object.values(query)}`);
    const date = Object.keys(query).join('')
    return (
        <Container>
            <div className="pt-6">
                <SearchInput className="mb-6"/>
            </div>
            <div className="flex gap-6 pb-10">
                <div className="flex-1">
                    <div className="mb-6">
                        <h2 className="mb-4">Результаты поиска</h2>
                        {searchData.results.length
                            ? <p className="font-normal text-base text-[#101828]">Показаны {searchData.count >= 10 ? 10 : searchData.count} результатов из {searchData.count} с совпадением
                                по запросу
                                <span className="font-medium text-base"> {Object.values(query)}</span>
                            </p>
                            : <p className="font-normal text-base text-[#101828]">По данному запросу ничего не найдено. Попробуйте ввести запрос иначе</p>
                        }
                    </div>
                    <div>
                        {searchData.results.length
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
                    date === 'date'
                    ? <div className="mt-[95]">
                        <NewsArchive/>
                    </div>
                        :
                        <div className="w-[267px] h-[436px] mt-[95px] rounded-lg bg-[#E0EBFF] flex items-center justify-center">
                            Место под рекламный баннер
                        </div>
                }
            </div>
        </Container>
    );
};

export default Page;