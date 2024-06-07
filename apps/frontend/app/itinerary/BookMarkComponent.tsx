"use client"
import React, { useState, useEffect } from 'react'
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

const BookMarkComponent: React.FC  = () => {
    const [isSaved, setIsSaved] = useState(false)

    const handleClick = () => {
        setIsSaved((prevIsSaved) => !prevIsSaved);
    }
 
    return (
        <button className="p-1 border-2 border-black-500 rounded-md flex space-x-2 saveButton" onClick={handleClick}>
            { isSaved ? <FaRegBookmark /> : <FaBookmark /> }
        </button>
    );
};

export default BookMarkComponent;