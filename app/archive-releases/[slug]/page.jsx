import {Container} from "@/components/shared/container";
import {getNewsPdfByYears, getNewsPdfPublishYears} from "@/lib/fetchData";
import NewsPdfContent from "@/components/shared/news-pdf-content";
import {Suspense} from "react";
import Loading from "@/app/loading";

const Page = async ({params}) => {
    const {slug} = await params;
    const pdfNewsYears = await getNewsPdfPublishYears();
    const pdfNewsFiles = await getNewsPdfByYears(slug);

    return (
        <Container>
            <h2 className="text-[#101828] font-bold mb-5 text-left pt-6">Архив выпусков</h2>
            <Suspense fallback={<Loading/>}>
                <NewsPdfContent pdfNewsYears={pdfNewsYears} pdfNewsFiles={pdfNewsFiles} slug={slug}/>
            </Suspense>
        </Container>
    );
};

export default Page;
