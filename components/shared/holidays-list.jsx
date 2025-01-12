import React from 'react';
import {format} from "date-fns";
import {ru} from "date-fns/locale";

const HolidaysList = ({holiday}) => {

    const formatDate = (start_date, end_date) => {
        const startDateFormatted = format(new Date(start_date), "d", { locale: ru });
        const monthFormatted = format(new Date(start_date), "MMMM", { locale: ru });

        if (end_date) {
            const endDateFormatted = format(new Date(end_date), "d", { locale: ru });
            return `${startDateFormatted}-${endDateFormatted} ${monthFormatted}`;
        }

        return `${startDateFormatted} ${monthFormatted}`;
    };

    return (
        <div className="mb-4">
            <h5 className="font-medium text-sm mb-[6px]">
                {formatDate(holiday?.start_date, holiday?.end_date)}
            </h5>
            {
                holiday?.names.map((el) => (
                    <p key={el} className="text-sm text-[#777E98] mb-[6px]">
                        {el}
                    </p>
                ))
            }
        </div>
    );
};

export default HolidaysList;