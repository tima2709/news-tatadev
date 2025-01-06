'use client'

import React, {useEffect, useRef, useState} from 'react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import SearchInput from "@/components/shared/search-input";
import {getRubrics} from "@/lib/fetchData";
import Link from "next/link";
import {useMediaQuery} from "react-responsive";

const MenuButton = ({children, focusSearch = false}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [rubrics, setRubrics] = useState([]);
    const [focus, setFocus] = useState(false)

    const isTablet = useMediaQuery({ maxWidth: 768 });
    const inputRef = useRef(null);

    useEffect(() => {
        const fetchRubrics = async () => {
            const data = await getRubrics();
            setRubrics(data);
        };

        fetchRubrics();
    }, []);

    const handleFocusSearch = () => {
        setFocus(!focus)
    }

    if (focusSearch || focus) {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Drawer direction={!isTablet ? "top" : "right"} open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger className="bg-[#E0EBFF] p-2 rounded-lg hover:bg-[#D1E2FF]">{children}</DrawerTrigger>
            <DrawerContent className="xl:px-[150px] lg:px-20 md:px-12 p-5 rounded-none md:h-auto h-full">
                <div className="flex justify-end">
                    <DrawerClose className="md:hidden block bg-[#E0EBFF] flex items-center justify-center h-10 w-10 rounded-lg hover:bg-[#D1E2FF]">
                        <Image
                            src="/ic_x-blue.svg"
                            alt="close icon"
                            width={24}
                            height={24}
                        />
                    </DrawerClose>
                </div>
                <DrawerHeader>
                    <DrawerTitle></DrawerTitle>
                        <nav className=" flex md:flex-col flex-col-reverse md:py-9 py-0">
                            <div className="flex items-start justify-between md:h-auto h-[70vh] md:overflow-auto overflow-y-scroll ">
                                <ul className="list-none md:flex md:flex-wrap block gap-10 md:mr-5">
                                    {rubrics?.map((item) => (
                                        <Link href={`/search?rubric=${item.slug}&page=1`} key={item.slug} onClick={handleClose}>
                                            <li className={`md:text-base text-left text-xl md:mb-0 mb-5 text-[#101828] font-medium hover:text-[#1757B9] cursor-pointer`}>
                                                {item.title}
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                                <div className="gap-4 md:flex hidden">
                                    <Button onClick={handleFocusSearch} variant="outline" className=" bg-[#E0EBFF] h-10 w-10 p-0 rounded-lg hover:bg-[#D1E2FF]">
                                        <Image
                                            src="/ic_search.svg"
                                            alt="search icon"
                                            width={24}
                                            height={24}
                                        />
                                    </Button>
                                    <DrawerClose className="bg-[#E0EBFF] flex items-center justify-center h-10 w-10 rounded-lg hover:bg-[#D1E2FF]">
                                        <Image
                                            src="/ic_x-blue.svg"
                                            alt="close icon"
                                            width={24}
                                            height={24}
                                        />
                                    </DrawerClose>
                                </div>
                            </div>
                            <div className="md:mt-8 mt-5 md:mb-0 mb-7">
                                <SearchInput handleClose={handleClose} inputRef={inputRef}/>
                            </div>
                        </nav>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <DrawerFooter></DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default MenuButton;