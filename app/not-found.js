import React from 'react';
import Image from "next/image";
import {Container} from "@/components/shared/container";
import Link from "next/link";

const NotFound = () => {
    return (
        <Container className="pt-10">
            <h2 className="mb-5">Такой страницы не существует</h2>
            <p className="mb-5 font-normal text-base">Похоже, вы потерялись. Попробуйте начать заново с <Link href="/" className="text-[#1757B9]">главной</Link></p>
            <Image src="/image_404.svg" alt="not found" width={364} height={364}/>
        </Container>
    );
};

export default NotFound;