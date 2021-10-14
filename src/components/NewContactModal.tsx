import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from '../contexts/ContactsProvider';

interface Props {
  closeModal: () => void;
}

const NewContactModal: React.FC<Props> = ({ closeModal }) => {
  const idRef = useRef<any>();
  const nameRef = useRef<any>();
  const { createContact } = useContacts();

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    createContact!(idRef.current.value, nameRef.current.value);
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required></Form.Control>
          </Form.Group>
          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};
export default NewContactModal;
