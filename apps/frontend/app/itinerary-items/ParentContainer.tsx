"use client"
import React, { useEffect, useState } from 'react';
import DynamicDivs from './DynamicDivs';
import SearchModal from './SearchModal';

interface ParentComponentProps {
    image_url: string;
}

const ParentComponent: React.FC<ParentComponentProps> = () => {
  const [divs, setDivs] = useState<DivItem[]>([]);
  const [fetchedData, setFetchedData] = useState<ItemData[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  interface ItemData {
    Item_Name: string;
    Item_Type: string;
    image_link: string;
  }

  interface DivItem {
    id: number;
    data: ItemData;
  }

  useEffect(() => {
    // const id = JSON.parse(localStorage.getItem('id') as string).id
    const id = 1;
    const baseUrl = 'http://localhost:4000'
    const apiUrl = new URL(`/itinerary-items/${id}`, baseUrl);
    const fetchItems = async () => {
        try {
          const response = await fetch(apiUrl);
          const data: ItemData[] = await response.json();
          console.log("Backend data: " + data);
          const initialDivs = data.map((dataItem, index) => ({
              id: index,
              data: dataItem,
          }));
          setDivs(initialDivs);
          setFetchedData(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

  fetchItems();
}, []);

  const handleAddDiv = (searched: boolean) => {
    if (searched) {
      const newId = divs.length;
      const newDiv = {
        id: newId,
        data: fetchedData[newId % fetchedData.length],
      };
  
      setDivs([...divs, newDiv]);
    }
  };
  
  const handleRemoveDiv = (id: number) => {
    setDivs(divs.filter(divItem => divItem.id !== id));
  };

  return (
    <div>
      <DynamicDivs passedDivs={divs} handleRemoveDiv={handleRemoveDiv} />
      <SearchModal handleAddDiv={handleAddDiv} />
    </div>
  );
};

export default ParentComponent;
