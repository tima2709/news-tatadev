'use client';

import React, { useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import Image from "next/image";

const SearchPagination = ({ searchData, slug, keyOfQuery, page }) => {
    const [pageCount, setPageCount] = useState(page);
    const router = useRouter();
    const totalPages = Math.ceil(searchData.count / 10);

    const handlePageClick = (pageNum) => {
        setPageCount(pageNum);
        if (keyOfQuery && keyOfQuery !== 'page') {
            router.push(`/search/?${keyOfQuery}=${slug}&page=${pageNum}`);
        } else {
            router.push(`/search/?page=${pageNum}`)
        }
    };

    const handleNext = () => {
        if (pageCount < totalPages) {
            handlePageClick(Number(pageCount) + 1);
        }
    };

    const handlePrev = () => {
        if (pageCount > 1) {
            handlePageClick(Number(pageCount) - 1);
        }
    };

    return (
        <Pagination className="relative">
            <PaginationContent>
                <PaginationItem  className="absolute left-0">
                    <PaginationPrevious
                        disabled={pageCount === 1}
                        onClick={handlePrev}
                    >
                        <Image src="/ic_arrow-left-gray.svg" alt="arrow icon right" width={24} height={24}/>
                    </PaginationPrevious>
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => {
                    const pageNum = index + 1;
                    return (
                        <PaginationItem key={pageNum}>
                            <PaginationLink
                                className={`font-medium text-sm rounded-full cursor-pointer hover:bg-[#D1E2FF] border-none ${
                                    pageNum === Number(page) ? "text-[#1757B9] bg-[#E0EBFF] " : "text-[#777E98]"
                                }`}
                                isActive={pageNum === Number(page)}
                                onClick={() => handlePageClick(pageNum)}
                            >
                                {pageNum}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
                {totalPages > 5 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                <PaginationItem className="absolute right-0">
                    <PaginationNext
                        disabled={!searchData.next}
                        onClick={handleNext}
                    ><Image src="/ic_arrow-right-gray.svg" alt="arrow icon right" width={24} height={24}/>
                    </PaginationNext>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default SearchPagination;
