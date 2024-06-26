"use client"
import React from 'react';
import { useState, useEffect } from 'react';

interface TempStorageProps {
  Item_Title: any,
  Item_Type: any,
  destination: any,
  location: any,
  id: any,
  image_url: any
}

const uploadItem = async(itemTitle: any, itemType: any, destination: any, image_url: any) => { 
  const id = localStorage.getItem('id') as string
  const location = localStorage.getItem('location') as string
  console.log("ID (tempstorage): " + id)
  console.log("Location (tempstorage): " + location)
  
  const tempDetails = {
    Item_Title: itemTitle,
    Item_Type: itemType,
    location: JSON.parse(location).location,
    id: JSON.parse(id).id,
    destination: destination,
    image_url: image_url
  }

  console.log("Going to upload to db...")
  console.log(tempDetails)

  try {
    const response = await fetch('/api/DatabaseUpload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tempDetails)
    });

    const data = await response.json();
    console.log("Response from server: ", data);
  } catch (error) {
    console.error("Error uploading item:", error);
  }

  // try {
  //   const response = await axios.post('/api/DatabaseUpload', tempDetails);
  //   console.log("Response from server:", response.data);
  // } catch (error) {
  //   console.error("Error uploading item:", error);
  // }
}

const TempStorage: React.FC<TempStorageProps> = ({id, location, destination, Item_Title, Item_Type, image_url}) => {
  const [l, setL] = useState('');
  const [i, setI] = useState('');

  useEffect(() => {
    //Checks if it has been stored... Useful for retrieving later on
    if (!destination) {
      handleSave()
      const storedLocation = localStorage.getItem('location');
      const storedID = localStorage.getItem('id');
      
      if (storedLocation) {
        setL(storedLocation);
        console.log(`Location: ${storedLocation}`)
      }
      if (storedID) {
        setI(storedID);
        console.log(`ID: ${storedID}`)
      }
    }
    else if (destination) {
      uploadItem(Item_Title, Item_Type, destination, image_url)
    }
    else {
      console.log("Destination & id + location values do not match up...")
    }
  }, []);

  const handleSave = () => {
    //LocalStorage saves the items for 1 hour
    localStorage.setItem('location', JSON.stringify({location: location, expiry: Date.now() + 60 * 60 * 1000 }));
    localStorage.setItem('id', JSON.stringify({id: id, expiry: Date.now() + 60 * 60 * 1000}));
    setL(location)
    setI(id.toString())
  };

  const handleLoad = (name: any) => {
    name = name.toUpperCase()
    if (name === 'LOCATION' || name === 'ID' || name === 'DESTINATION') {
      const itemVal = localStorage.getItem(name);
      console.log(`${name}: ${itemVal}`)
      return itemVal
    }
    else return `Item ${name} does not exist in localstorage`;
  };

  return (
    <div className='TEMPCLASS'>
    </div>
  );
};

export default TempStorage;