import { cn } from '@/lib/utils';
import React from 'react';


export const Container = ({ className, children }) => {
    return <div className={cn('mx-auto max-w-[1440px] xl:px-[150px] lg:px-20 md:px-12 px-5 lg:py-0 py-5', className)}>{children}</div>;
};