import React from 'react';
import Image from "next/image";
import SearchInput from "@/components/shared/search-input";

const AddComments = () => {
    return (
        <div className="p-6 border border-[#E0EBFF] bg-white rounded-lg ">
            <h3 className="mb-4">Комментарии</h3>
            <p className="mb-6">Здесь пока нет комментариев. Станьте первым!</p>
            <div className="mt-8">
               <SearchInput/>
            </div>
        </div>
    );
};

export default AddComments;