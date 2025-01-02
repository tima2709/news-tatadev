import React from 'react';
import Image from "next/image";
import Link from "next/link";
import MenuButton from "@/components/shared/menu-button";
import WeatherExchange from "@/components/shared/weather-exchange";
import {getHeaderData, getRubrics} from "@/lib/fetchData";

const Header = async () => {

    const headerData = await getHeaderData();
    const rubrics = await getRubrics();

    return (
        <header
            className="xl:block flex flex-row-reverse justify-between max-w-[1440px] mx-auto xl:py-4 xl:px-[150px]  lg:px-20 md:px-12 p-5">
            <nav className="flex items-center justify-between gap-4">
                <ul className="xl:flex hidden list-none justify-between items-center max-w-[1000px] w-full">
                    {rubrics.slice(0,8).map((item) => (
                        <Link href={`/search?rubric=${item.slug}&page=1`} key={item.slug}><li className="font-medium text-base hover:text-[#1757B9] duration-200">{item.title}</li></Link>
                    ))}
                </ul>
                <div className="flex md:gap-4 gap-2">
                    <MenuButton>
                        <Image
                            src="/ic_search.svg"
                            alt="search icon"
                            width={24}
                            height={24}
                        />
                    </MenuButton>
                    <>
                        <MenuButton>
                            <Image
                                src="/ic_menu.svg"
                                alt="menu icon"
                                width={24}
                                height={24}
                            />
                        </MenuButton>
                    </>
                </div>
            </nav>
            <div className="flex items-center justify-between xl:gap-0 lg:gap-10 gap-14 xl:py-4">
                <Link href="/">
                    <div className="flex items-center md:gap-5 gap-[10px]">
                        <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 lg:w-[72px] lg:h-[72px]">
                            <Image
                                src={headerData?.logo}
                                alt="logo"
                                fill
                                objectFit="contain"
                            />
                        </div>
                        <div>
                            <h1 className="site-title font-black xl:text-[42.64px] lg:text-3xl text-[21px] text-[#1757B9]">{headerData.title}</h1>
                            <p className="text-[#101828] lg:text-lg md:text-sm text-[9px]">{headerData.preview}</p>
                        </div>
                    </div>
                </Link>
                <WeatherExchange className="lx:flex lg:block hidden items-center"/>
            </div>
        </header>
    );
};

export default Header;
