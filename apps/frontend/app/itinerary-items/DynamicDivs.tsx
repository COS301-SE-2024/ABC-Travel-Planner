"use client"
import React, { useState } from 'react'
import { Button } from '@nextui-org/react';
import SearchModal from "./SearchModal"
import "./modal.css"

interface DivItem {
    id: number;
}

const DynamicDivs: React.FC = () => {

    const [divs, setDivs] = useState<DivItem[]>([]);

    const handleAddDiv = () => {
        console.log("Divs set...")
        setDivs([...divs, { id: divs.length }]);
    };

    const handleRemoveDiv = (id: number) => {
        setDivs(divs.filter(divItem => divItem.id !== id));
    }
    //<div className="relative rounded-md border-black-500 button-div">
    //</div>
        
    return (
        <>
        {divs.map((divItem) => (
            <div key={divItem.id} className="relative border-2 border-black-500 rounded-md item-div">
            <Button className="absolute top-2 right-2 text-gray-800 hover:text-gray-700 focus:outline-none closeButton" onClick={() => handleRemoveDiv(divItem.id)}>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </Button>
        </div>
        ))}
        <SearchModal handleAddDiv={ handleAddDiv }/>
        </>
    );
};

export default DynamicDivs;