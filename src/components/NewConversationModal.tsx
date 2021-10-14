import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from '../contexts/ConversationsProvider';

interface Props {
  closeModal: () => void;
}

const NewConversationModal: React.FC<Props> = ({ closeModal }) => {
  const { contacts } = useContacts();
  const { createConversation } = useConversations();
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  
  const handleCheckboxChange = (id: string) => {
    setSelectedContactIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((prevId) => {
          return id !== prevId;
        });
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    createConversation!(selectedContactIds);
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts!.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactIds.includes(contact.id).toString()}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              ></Form.Check>
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};
export default NewConversationModal;
