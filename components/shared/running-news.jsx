import React from 'react';
import {cn} from "@/lib/utils";

const RunningNews = ({className}) => {
    const news = [
        'В Бишкеке сегодня произойдёт временное отключение питьевой воды',
        'В Кыргызстане выберут участок для строительства АЭС',
        'В Бишкеке четыре троллейбуса новой линии будут обслуживать маршрут №4',
        'В Бишкеке сегодня произойдёт временное отключение питьевой воды',
        'В Кыргызстане выберут участок для строительства АЭС',
        'В Бишкеке четыре троллейбуса новой линии будут обслуживать маршрут №4',
    ];

    return (
        <div className={cn("w-full overflow-hidden bg-[#E0EBFF]", className)}>
            <div className="relative whitespace-nowrap animate-[ticker_20s_linear_infinite]">
                <div className="inline-block">
                    {news.map((item, index) => (
                        <span key={index} className="inline-block text-[#1757B9] font-semibold py-2">
              <span className="px-4">•</span> {item}
            </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RunningNews;