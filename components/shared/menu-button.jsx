import React from 'react';
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

const MenuButton = async ({children}) => {

    const rubrics = await getRubrics();

    return (
        <Drawer direction="top">
            <DrawerTrigger className="bg-[#E0EBFF] p-2 rounded-lg hover:bg-[#D1E2FF]">{children}</DrawerTrigger>
            <DrawerContent className="px-[150px] rounded-none">
                <DrawerHeader>
                    <DrawerTitle>
                        <nav className="flex flex-col py-9">
                            <div className="flex items-start justify-between">
                                <ul className="list-none flex flex-wrap gap-10">
                                    {rubrics.map((item) => (
                                        <Link href={`/search?rubric=${item.slug}`} key={item.slug}>
                                            <li className={`text-base text-[#101828] font-medium hover:text-[#1757B9] cursor-pointer`}>
                                                {item.title}
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="bg-[#E0EBFF] h-10 w-10 p-0 rounded-lg hover:bg-[#D1E2FF]">
                                        <Image
                                            src="/ic_search.svg"
                                            alt="search icon"
                                            width={24}
                                            height={24}
                                        />
                                    </Button>
                                    <DrawerClose className="bg-[#E0EBFF] flex items-center justify-center h-10 w-10 rounded-lg hover:bg-[#D1E2FF]">
                                        <Image
                                            src="/ic_x.svg"
                                            alt="close icon"
                                            width={24}
                                            height={24}
                                        />
                                    </DrawerClose>
                                </div>
                            </div>
                            <div className="mt-8">
                                <SearchInput/>
                            </div>
                        </nav>
                    </DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <DrawerFooter></DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default MenuButton;