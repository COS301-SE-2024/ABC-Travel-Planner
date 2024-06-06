import React from 'react'
import { Button, Input, Checkbox, useDisclosure } from '@nextui-org/react';
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
  } from "@nextui-org/modal";

interface SearchModalProps {
    visible: boolean;
    onClose: ()=> void;
}

const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h3>Welcome to NextUI</h3>
                        </ModalHeader>
                        <ModalBody>
                            <p>This is a simple modal example using NextUI.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={onClose}>
                            Close
                            </Button>
                            <Button onClick={onClose}>
                            Submit
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
        );
};

export default SearchModal;