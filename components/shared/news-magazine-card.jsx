'use client'
import "pdfjs-dist/build/pdf.worker.min.mjs";
import React, {useState} from "react";
import {GlobalWorkerOptions} from "pdfjs-dist";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import PDFViewer from "@/components/shared/PDFViewer";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {ru} from "date-fns/locale/ru";

GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.min.mjs";

const NewsMagazineCard = ({pdfUrl, className, type}) => {
    const [open, setOpen] = useState(false)
    const date = (publish_date) => {
        let formattedDate = format(publish_date, "dd.MM.yyyy", {locale: ru})
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return (
        <div className={cn("w-[170px] h-[268px] overflow-hidden", className)}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    {type !== "main" &&
                        <p className="mb-2 text-left font-medium text-sm">{date(pdfUrl?.publish_date)}</p>}
                    <img className="custom-shadow border-none object-cover" src={pdfUrl?.cover_img} alt={pdfUrl?.title}
                         style={{width: "100%", height: "100%"}}></img>
                </DialogTrigger>
                <DialogContent closeBtn={false} className="max-w-[1300px] h-full overflow-scroll no-scrollbar lg:mt-0 py-20">
                    <DialogHeader className="hidden">
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <PDFViewer pdfUrl={pdfUrl} setOpen={setOpen}/>
                </DialogContent>
            </Dialog>
        </div>

    );
};

export default NewsMagazineCard;
