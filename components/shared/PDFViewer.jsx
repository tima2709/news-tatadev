"use client";
import "pdfjs-dist/build/pdf.worker.min.mjs";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.min.mjs";

const PDFViewer = ({ pdfUrl }) => {
    const canvasRefLeft = useRef(null);
    const canvasRefRight = useRef(null);
    const [pdf, setPdf] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [scale, setScale] = useState(0.5); // Начальный масштаб

    useEffect(() => {
        const loadPDF = async () => {
            try {
                const loadedPdf = await getDocument(pdfUrl?.pdf_file).promise;
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

    useEffect(() => {
        if (!pdf) return;
        renderPage(currentPage, canvasRefLeft);
        if (currentPage + 1 <= totalPages) {
            renderPage(currentPage + 1, canvasRefRight);
        }
    }, [pdf, currentPage, scale, renderPage, totalPages]);

    const handleNextPage = () => {
        if (currentPage + 2 <= totalPages) setCurrentPage(currentPage + 2);
    };

    const handlePrevPage = () => {
        if (currentPage - 2 >= 1) setCurrentPage(currentPage - 2);
    };

    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.3, 3)); // Увеличиваем до 3x
    const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.3, 0.5)); // Уменьшаем до 0.5x

    const isFirstPage = useMemo(() => currentPage === 1, [currentPage]);
    const isLastPage = useMemo(() => currentPage + 1 >= totalPages, [currentPage, totalPages]);

    return (
        <div className="">
            <div className="flex items-center justify-center bg-white p-3 top-10 left-10 w-max gap-4 mb-4 z-10">
                <button onClick={handleZoomOut} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                    −
                </button>
                <span>Масштаб: {scale.toFixed(1)}x</span>
                <button onClick={handleZoomIn} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                    +
                </button>
            </div>

            <div className=" flex gap-4 justify-center">
                <canvas ref={canvasRefLeft} className="border rounded shadow" />
                {!isLastPage && <canvas ref={canvasRefRight} className="border rounded shadow" />}
            </div>

            <div className="flex justify-center items-center gap-4 mt-4">
                <button onClick={handlePrevPage} disabled={isFirstPage} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50">
                    Пред
                </button>
                <span>Страница {currentPage} из {totalPages}</span>
                <button onClick={handleNextPage} disabled={isLastPage} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50">
                    След
                </button>
            </div>
        </div>
    );
};

export default PDFViewer;
