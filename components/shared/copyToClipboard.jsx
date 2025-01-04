'use client'

import React from 'react';
import {useToast} from "@/hooks/use-toast";
import Image from "next/image";

const CopyToClipboard = ({slug, shareMedia}) => {
    const { toast } = useToast();

    let links = process.env.NEXT_PUBLIC_URL_NEWS_DETAIL + slug

    const copylink = (e) => {
        navigator.clipboard.writeText(links)
        toast({
            title: "Ссылка скопирована",
        });
    }

    return (
        <button onClick={copylink} className="bg-transparent border-none" >
            <Image src={shareMedia[4].icon} alt={shareMedia[4].network} width={32} height={32}/>
        </button>
    );
};

export default CopyToClipboard;