import { Typography } from "@/common";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { Choice } from "hedsvote";

const ChoiceModal = ({ choice, isOpen, setIsOpen }: { choice: Choice; isOpen: boolean; setIsOpen: (arg: boolean) => void }) => {
  return (
    <Modal isOpen onClose={() => setIsOpen(false)} isCentered size="sm">
      <ModalOverlay />
      <ModalContent bg="heds.bg" mx={2}>
        <ModalHeader>{choice?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Typography>Modal Content</Typography>
        </ModalBody>
        <ModalFooter>
          <Button>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChoiceModal;
