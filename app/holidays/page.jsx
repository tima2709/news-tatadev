import React from 'react';
import HolidaysCalendarList from "@/components/sections/holidays-calendar-list";
import {Container} from "@/components/shared/container";

const Page = () => {
    return (
        <Container>
            <HolidaysCalendarList className="md:w-[267px] w-full"/>
        </Container>
    );
};

export default Page;