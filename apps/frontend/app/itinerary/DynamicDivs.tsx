"use client"
import React, { useState } from 'react'
import { Button } from '@nextui-org/react';
import "./modal.css"

interface DivItem {
    id: number;
}

const DynamicDivs: React.FC = () => {

    const [divs, setDivs] = useState<DivItem[]>([]);

    const handleAddDiv = () => {
        setDivs([...divs, { id: divs.length }]);
    };

    const handleRemoveDiv = (id: number) => {
        setDivs(divs.filter(divItem => divItem.id !== id));
    }

    return (
        <div className="container">
            <div className="grid grid-cols-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 iteneraries-grid rounded-lg h-full sm:h-auto">
                {divs.map((divItem) => (
                <div key={divItem.id} className="relative border-2 border-black-500 rounded-md bg-gray-200 item-div">
                    <Button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none closeButton" onClick={() => handleRemoveDiv(divItem.id)}>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Button>
                    <button className="bg-blue-500 rounded-md"></button>
                </div>
                ))}
                <Button className="bg-gray-200 rounded-md addButton" key="md" onClick={handleAddDiv}>+</Button>
            </div>
        </div>
    );
};

export default DynamicDivs;