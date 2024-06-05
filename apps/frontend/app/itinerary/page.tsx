"use client"
import { Input } from "@nextui-org/react";
import DateModal from "./dateModal"

import React, { useState } from "react";

const radiusOptions = [
  "full",
  "lg",
  "md",
  "sm",
  "none"
];

//Input for the date of the trip
//...

//Middle section
  //Plus button
  //Dynamically add the boxes as the user clicks (if successful)
  //Done button
  //Save button

const Itinerary = () => {
  const [visible, setVisible] = useState(false);
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  
  return (
    <div className="w-full flex flex-row flex-wrap gap-4">
        <Input
          key="sm"
          radius="sm"
          type="email"
          label="Email"
          placeholder="Itenerary name"
          defaultValue="Default itenerary"
          className="max-w-[220px]"
        />

        <DateModal visible={visible} onClose={closeModal} />
    </div>
  );
  };
  
  export default Itinerary;
  