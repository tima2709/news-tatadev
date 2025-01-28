"use client";
import "pdfjs-dist/build/pdf.worker.min.mjs";
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import {Minus, Plus, X} from "lucide-react";
import {Button} from "@/components/ui/button";

GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.min.mjs";

const PDFViewer = ({ pdfUrl, setOpen }) => {
    const canvasRefLeft = useRef(null);
    const canvasRefRight = useRef(null);
    const canvasRefSingle = useRef(null);

    const [pdf, setPdf] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [scale, setScale] = useState(0.5);

    useEffect(() => {
        const loadPDF = async () => {
            try {
                const loadedPdf = await getDocument(pdfUrl?.pdf_file).promise;
                console.log(loadedPdf, 'pdf')
                setPdf(loadedPdf);
                setTotalPages(loadedPdf.numPages);
            } catch (error) {
                console.error("Ошибка загрузки PDF:", error);
            }
        };

        if (pdfUrl?.pdf_file) {
            loadPDF();
        }
    }, [pdfUrl]);

    console.log(totalPages, 'pages')

    const renderPage = useCallback(
        async (pageNumber, canvasRef) => {
            if (!pdf || !canvasRef.current) return;

            try {
                const page = await pdf.getPage(pageNumber);
                const viewport = page.getViewport({ scale });
                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({ canvasContext: context, viewport }).promise;
            } catch (error) {
                console.error(`Ошибка рендера страницы ${pageNumber}:`, error);
            }
        },
        [pdf, scale]
    );

    const isFirstPage = useMemo(() => currentPage === 1, [currentPage]);
    const isLastPage = useMemo(() => currentPage + 1 >= totalPages, [currentPage, totalPages]);

    useEffect(() => {
        if (!pdf) return;

        if (isFirstPage || isLastPage) {
            renderPage(currentPage, canvasRefSingle);
            return;
        }

        renderPage(currentPage, canvasRefLeft);
        if (currentPage + 1 <= totalPages) {
            renderPage(currentPage + 1, canvasRefRight);
        }
    }, [pdf, currentPage, scale, renderPage, totalPages]);

    const handleNextPage = () => {
        if (isFirstPage || isLastPage) {
            setCurrentPage(currentPage + 1);
            return;
        }
        if (currentPage + 2 <= totalPages) setCurrentPage(currentPage + 2);
    };

    const handlePrevPage = () => {
        if (currentPage - 1 === 1) {
            setCurrentPage(1);
            return;
        }
        if (currentPage - 2 >= 1) setCurrentPage(currentPage - 2);
    };

    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.3, 3));
    const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.3, 0.5));

    const pageString = () => {
        let string = "Страниц";

        if (isFirstPage || isLastPage) {
            string += "а " + currentPage.toString();
        } else {
            string += `ы ${currentPage} и ${currentPage + 1}`;
        }
        return string;
    }

    return (
        <div>
            <div className="sticky flex items-center justify-start bg-white rounded-lg w-max py-2 px-4 top-0 left-0 gap-4 mb-4 z-10">
                <button onClick={handleZoomOut} className="p-2 bg-gray-300 rounded hover:bg-gray-400">
                    <Minus/>
                </button>
                <span>Масштаб: {scale.toFixed(1)}x</span>
                <button onClick={handleZoomIn} className="p-2 bg-gray-300 rounded hover:bg-gray-400">
                    <Plus/>
                </button>
                <button onClick={() => setOpen(false)} className="w-5 h-5 "><X/></button>
            </div>

            <div className=" flex gap-4 justify-center">
                {
                    isFirstPage || isLastPage ?
                        <canvas ref={canvasRefSingle} className="border rounded shadow" />:
                        <>
                            <canvas ref={canvasRefLeft} className="border rounded shadow" />
                            <canvas ref={canvasRefRight} className="border rounded shadow" />
                        </>
                }
            </div>

            <div className="flex justify-center items-center gap-4 mt-5">
                <button onClick={handlePrevPage} disabled={isFirstPage} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50">
                    Пред
                </button>
                <span>{pageString()} из {totalPages}</span>
                <button onClick={handleNextPage} disabled={isLastPage} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50">
                    След
                </button>
            </div>
        </div>
    );
};

export default PDFViewer;
