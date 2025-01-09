'use client'

import  React from 'react';
import {useToast} from "@/hooks/use-toast";
import Image from "next/image";

const CopyToClipboard = ({ network, icon, links}) => {
    const { toast } = useToast();

    const copylink = (e) => {
        navigator.clipboard.writeText(links)
        toast({
            title: "Ссылка скопирована",
        });
    }

    return (
        <button onClick={copylink} className="bg-transparent border-none" >
            <Image src={icon} alt={network} width={36} height={36}/>
        </button>
    );
};

export default CopyToClipboard;