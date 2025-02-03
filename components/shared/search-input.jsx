'use client'

import React, {useState} from 'react';
import Image from 'next/image';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {useRouter} from "next/navigation";

const SearchInput = ({className, handleClose, inputRef}) => {

    const [search, setSearch] = useState('');

    const router = useRouter();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchData();
        }
    };

    const handleSearchData = () => {
        if (search.trim()) {
            router.push(`/search?search=${search}&page=1`);
            handleClose();
        }
    };

    const handleClearSearch = () => {
        setSearch('')
    }

    return (
        <div className={cn('relative', className)}>
            <input
                type="text"
                value={search}
                ref={inputRef}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Поиск по сайту"
                className="w-full px-4 py-4 pr-12 border border-[#E0EBFF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D1E2FF]"
            />

            {search?.length
                ? <Button
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-transparent border-none hover:bg-white shadow-none"
                    onClick={handleClearSearch}
                >
                    <Image src="/ic_x-blue.svg" alt="search icon" width={24} height={24}/>
                </Button>
                : <Button
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-transparent border-none hover:bg-white shadow-none"
                    onClick={handleSearchData}
                >
                    <Image src="/ic_search.svg" alt="search icon" width={24} height={24}/>
                </Button>
            }


        </div>
    );
};

export default SearchInput;
