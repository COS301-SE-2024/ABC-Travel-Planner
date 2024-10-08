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
import { useTheme } from "../context/ThemeContext";
interface SearchModalProp {
  handleAddDiv: () => void;
}

const SearchModal: React.FC<SearchModalProp> = ({ handleAddDiv }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { selectedTheme, themeStyles, setTheme } = useTheme();
  
  const onClose = () => {
      if (isOpen) {
        handleAddDiv();
        setIsOpen(false)
      }
      else  {
        setIsOpen(true) 
      }
  }
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" />
        
      )}

      <Button className="fixed bottom-4 right-4 hover:bg-blue-400 text-white rounded-full addButton mb-[60px]" style={{ background: themeStyles.navbarColor}} key="md" onClick={onClose}>+</Button>
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onClose} style={{maxHeight: '1000px', padding: '0px 0px 0px 0px', borderRadius: '4px'}}>
        <ModalContent className="modal-content px-0 py-0 rounded">
          <>
            <ModalBody className="px-0 py-0 rounded">
              <FilterContainer />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchModal;