import React from 'react';
import Image from "next/image";
import {getHeaderData} from "@/lib/fetchData";

const Footer = async () => {

    const headerData = await getHeaderData();

    const secondGrid = ["Новости", "Политика", "Экономика", "Общество", "Культура", "Спорт", "Проишествия", "Новости Русского мира"]
    const thirdGrid = ["Новости регионов", "Местное самоуправление", "Сотрудничество", "Наша гордость", "Технологии и гаджеты", "Видео ", "Фоторепортаж"]
    const fourthGrid = ["О Нас", "Контакты", "Объявления", "Вакансии"]
    const onMobileGrid = ["Праздники месяца", "Архив новостей"]

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
                    <Image src={"/instagram.svg"} alt={"instagram"} width={32} height={32}/>
                    <Image src={"/facebook.svg"} alt={"facebook"} width={32} height={32}/>
                    <Image src={"/telegram.svg"} alt={"telegram"} width={32} height={32}/>
                    <Image src={"/youtube.svg"} alt={"youtube"} width={32} height={32}/>
                </div>
            </div>
            <div className="md:order-2">
                <ul className="list-none">
                    {secondGrid.map((item, idx) => (
                        <li key={idx} className="font-medium text-base text-[#101828] mb-4 hover:text-[#1757B9] duration-200 cursor-pointer">{item}</li>
                    ))}
                </ul>
                <ul className="list-none md:hidden block">
                    {thirdGrid.map((item, idx) => (
                        <li key={idx} className="font-medium text-base text-[#101828] mb-4 hover:text-[#1757B9] duration-200 cursor-pointer">{item}</li>
                    ))}
                </ul>
            </div>
            <div className="md:block hidden">
                <ul className="list-none">
                    {thirdGrid.map((item, idx) => (
                        <li key={idx} className="font-medium text-base text-[#101828] mb-4 hover:text-[#1757B9] duration-200 cursor-pointer">{item}</li>
                    ))}
                </ul>
            </div>
            <div className="md:order-4 order-3">
                <ul className="list-none">
                    {fourthGrid.map((item, idx) => (
                        <li key={idx} className="font-medium text-base text-[#101828] mb-4 hover:text-[#1757B9] duration-200 cursor-pointer">{item}</li>
                    ))}
                    {
                        onMobileGrid.map((item,idx) => (
                            <li key={idx} className="lg:hidden block font-medium text-base text-[#101828] mb-4 hover:text-[#1757B9] duration-200 cursor-pointer">{item}</li>
                        ))
                    }
                </ul>
                <div className="md:hidden block">
                    <div className="flex items-center gap-2 mt-10 mb-7">
                        <Image src={"/instagram.svg"} alt={"instagram"} width={32} height={32}/>
                        <Image src={"/facebook.svg"} alt={"facebook"} width={32} height={32}/>
                        <Image src={"/telegram.svg"} alt={"telegram"} width={32} height={32}/>
                        <Image src={"/youtube.svg"} alt={"youtube"} width={32} height={32}/>
                    </div>
                    <div className="flex mb-4 gap-5 items-end">
                        <h6 className="font-normal text-xs">Сайт создан при поддержке Фонда “Русский мир”</h6>
                        <Image src={"/fond-logo.png"} alt={"logo"} width={88} height={25}/>
                    </div>
                    <p className="font-normal text-xs">Размещенные материалы предназначены только для персонального
                        пользования. При использовании
                        материалов обязательна гиперссылка на ресурс.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;