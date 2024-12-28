import React from 'react';
import NewsCard from "@/components/shared/new-card/news-card";
import {getNewsByRubrics} from "@/lib/fetchData";
import YoutubeVideo from "@/components/shared/youtube-video";

const AllRubricsNews = async ({rubrics}) => {

    const rubricNews = await getNewsByRubrics(rubrics);

    const filteredRubricNews = rubricNews.filter(rubric => rubric.news && rubric.news.length > 0);

    console.log(filteredRubricNews, 'filter news')

    return (
        <div className="lg:w-[calc(100%-291px)] w-full">
            {filteredRubricNews.map((rubric) => (
                rubric.type === "article"
                    ? <NewsCard key={rubric.slug} rubric={rubric}/>
                    : <YoutubeVideo key={rubric.slug} rubric={rubric}/>
            ))}
        </div>
    );
};

export default AllRubricsNews;