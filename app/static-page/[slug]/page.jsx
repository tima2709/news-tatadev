import React from 'react';
import {getStaticPagesBySlug} from "@/lib/fetchData";
import {Container} from "@/components/shared/container";

const Page = async ({params}) => {

    const {slug} = await params;

    const staticData = await getStaticPagesBySlug(slug);

    return (
        <Container className="min-h-[600px]">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="mb-6">{staticData.title}</h2>
                <div
                    dangerouslySetInnerHTML={{__html: staticData?.content}}
                    className="ck-content"
                ></div>
            </div>
        </Container>
    );
};

export default Page;