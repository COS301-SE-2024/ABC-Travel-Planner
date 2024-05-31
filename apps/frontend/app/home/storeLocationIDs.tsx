"use client";
import { useEffect, useState } from 'react'

const storeLocationIDs = ({data} : any) => {
    const [currItems, setItems] = useState<string[]>([]);
    const addLocationID = (item: any) => {
        console.log("Received Item: " + item)
        const newItems = [...currItems, item];
        setItems(newItems);
        
        if (typeof window !== 'undefined') {
            window.sessionStorage.setItem('currItems', JSON.stringify(newItems));
        }
        else console.log("Could not add location! Window undefined...")
    };

    useEffect(() => { 
        if (typeof window !== 'undefined') {
            const storedItems = window.sessionStorage.getItem('items')
            if (storedItems) {
                setItems(JSON.parse(storedItems));
            }
        }
    }, [addLocationID]);

    const clearIDs = () => {
        setItems([]);

        if (typeof window !== 'undefined') {
            window.sessionStorage.removeItem('items');
        } 
        else console.log("Could not clear IDs! Window undefined...")
    };
}
export default storeLocationIDs;