"use client"
import React, { useEffect, useState } from 'react';
import Search from '../search/page';
import FilterContainer from './filterContainer';
import { Button } from '@nextui-org/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';

interface SearchModalProp {
  handleAddDiv: () => void;
}

const SearchModal: React.FC<SearchModalProp> = ({ handleAddDiv }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const onClose = () => {
      if (isOpen) {
        handleAddDiv();
        setIsOpen(false)
        console.log("Open: " + isOpen)
      }
      else  {
        setIsOpen(true) 
        console.log("Open: " + isOpen)
      }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" />
        
      )}
      <Button className="bg-gray-200 rounded-md addButton" key="md" onClick={onClose}>+</Button>
      <Modal size="md" isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent className="modal-content">
          <>
            <ModalBody>
              <FilterContainer />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchModal;