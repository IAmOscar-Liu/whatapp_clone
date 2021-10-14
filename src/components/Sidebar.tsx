import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import KEYS from "../KEYS";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewConversationModal from "./NewConversationModal";
import NewContactModal from "./NewContactModal";

interface Props {
  id: string;
}

const Sidebar: React.FC<Props> = ({ id }) => {
  const [activeKey, setActiveKey] = useState<string | null>(
    KEYS.CONVERSATIONS_KEY
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const conversationOpen = activeKey === KEYS.CONVERSATIONS_KEY;

  const closeModal = () => {
      setModalOpen(false);
  }

  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container
        activeKey={activeKey}
        onSelect={(select) => setActiveKey(select)}
      >
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={KEYS.CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={KEYS.CONTACT_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={KEYS.CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={KEYS.CONTACT_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your Id: <span className="text-muted">{id}</span>
        </div>
        <Button className="rounded-0" onClick={() => setModalOpen(true)}>
          New {conversationOpen ? "Conversation" : "Contact"}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {
          conversationOpen ?
           <NewConversationModal closeModal={closeModal} /> 
           : <NewContactModal closeModal={closeModal} />
         }
      </Modal>
    </div>
  );
};
export default Sidebar;
