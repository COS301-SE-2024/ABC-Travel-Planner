"use client"
import React, { useState } from 'react';
import Search from '../search/page';
import { Button } from '@nextui-org/react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';

const SearchModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    if (isOpen) {
      setIsOpen(false)
      // React.createElement('div')
      
    }
    else setIsOpen(true)
  }

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50" />
      )}
      <Modal size="md" isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent className="modal-content">
          <>
            <ModalBody>
              <Search />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchModal;
