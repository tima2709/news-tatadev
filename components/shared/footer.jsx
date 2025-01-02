import React from 'react';
import Image from "next/image";
import {getHeaderData, getRubrics, getSocialLinks, getStaticPages} from "@/lib/fetchData";
import Link from 'next/link';

const Footer = async () => {

    const headerData = await getHeaderData();
    const aboutUsContacts = await getStaticPages();
    const socialLinks = await getSocialLinks();
    const rubrics = await getRubrics();

    const fourthGrid = [{slug: "attentions", title: "Объявления",},{slug: "vacancies", title:  "Вакансии"}]
    const onMobileGrid = [{slug: "holidays", title: "Праздники месяца"}, {slug: "archive-news", title: "Архив новостей"}]

    return (
        <footer
            className="grid lg:grid-cols-5 grid-cols-2 bg-[#E0EBFF] xl:px-[150px] lg:px-20 md:px-12 p-5 pt-8 md:pb-[102px] pb-20 lg:gap-[60px] md:gap-x-6 gap-x-3">
            <div className="lg:col-span-2 md:order-0 md:block hidden">
                <div className="flex mb-4 gap-5 items-end">
                    <h6 className="font-normal text-xs">{headerData.support_title}</h6>
                    <Image src={headerData.support_logo} alt={"support logo"} width={88} height={25}/>
                </div>
                <p className="font-normal text-xs">{headerData.support_preview}
                </p>
                <div className="flex items-center gap-2 mt-5">
                    {
                        socialLinks.map((link) => (
                            <a href={link.link} target="_blank" key={link.name}>
                                <Image src={link.icon} alt={link.name} width={32} height={32}/>
                            </a>
                        ))
                    }
                </div>
            </div>
            <div className="md:order-2">
                <ul className="list-none">
                    {rubrics.slice(0,8).map((item) => (
                        <Link href={`/search?rubric=${item.slug}&page=1`} key={item.slug}>
                            <li className="font-medium text-base text-[#101828] mb-4 hover:text-[#1757B9] duration-200 cursor-pointer">{item.title}</li>
                        </Link>
                    ))}
                </ul>
                <ul className="list-none md:hidden block">
                    {rubrics.slice(8).map((item) => (
                        <Link href={`/search?rubric=${item.slug}&page=1`} key={item.slug}>
                            <li className="font-medium text-base text-[#101828] mb-4 hover:text-[#1757B9] duration-200 cursor-pointer">{item.title}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="md:block hidden">
                <ul className="list-none">
                    {rubrics.slice(8).map((item) => (
                        <Link href={`/search?rubric=${item.slug}&page=1`} key={item.slug}>
                            <li className="font-medium text-base text-[#101828] mb-4 hover:text-[#1757B9] duration-200 cursor-pointer">{item.title}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="md:order-4 order-3">
                <ul className="list-none">
                    {aboutUsContacts.reverse().map((item) => (
                        <Link key={item.slug} href={`/static-page/${item.slug}`}>
                            <li className="font-medium text-base text-[#101828] mb-4 hover:text-[#1757B9] duration-200 cursor-pointer">
                                {item.title}
                            </li>
                        </Link>
                    ))}
                    {fourthGrid.map((item) => (
                        <Link key={item.slug} href={`/${item.slug}`}>
                            <li className="font-medium text-base text-[#101828] mb-4 hover:text-[#1757B9] duration-200 cursor-pointer">{item.title}</li>
                        </Link>
                    ))}
                    {
                        onMobileGrid.map((item,idx) => (
                            <Link key={item.slug} href={`/${item.slug}`}>
                                <li key={idx} className="lg:hidden block font-medium text-base text-[#101828] mb-4 hover:text-[#1757B9] duration-200 cursor-pointer">{item.title}</li>
                            </Link>
                        ))
                    }
                </ul>
                <div className="md:hidden block">
                    <div className="flex items-center gap-2 mt-10 mb-7">
                        {
                            socialLinks.map((link) => (
                                <a href={link.link} key={link.name}>
                                    <Image src={link.icon} alt={link.name} width={32} height={32}/>
                                </a>
                            ))
                        }
                    </div>
                    <div className="flex mb-4 gap-5 items-end">
                        <h6 className="font-normal text-xs">Сайт создан при поддержке Фонда “Русский мир”</h6>
                        <Image src={"/fond-logo.png"} alt={"logo"} width={88} height={25}/>
                    </div>
                    <p className="font-normal text-xs text-[#777E98] max-w-[365px]">
                        Размещенные материалы предназначены только для персонального
                        пользования. При использовании
                        материалов обязательна гиперссылка на ресурс.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;