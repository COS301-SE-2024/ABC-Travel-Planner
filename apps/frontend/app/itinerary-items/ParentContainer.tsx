"use client"
import React, { useState } from 'react';
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
