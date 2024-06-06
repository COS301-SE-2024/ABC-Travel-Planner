import React, { useState } from 'react'
import Search from "../search/page"

import { Button, Input, Checkbox } from '@nextui-org/react';
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    useDisclosure 
  } from "@nextui-org/modal";

interface SearchModalProps {
    isOpen: boolean;
    onClose: ()=> void;
}

const SearchModal: React.FC<SearchModalProps> = ({isOpen, onClose}) => {
    return (
      <Modal size="md" isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add an Item</ModalHeader>
              <ModalBody>
                <Search />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
};

export default SearchModal;