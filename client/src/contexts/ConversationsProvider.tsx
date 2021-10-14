import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";
import { Conversation, FormattedConversation } from "../types";

interface ConversationProps {
  conversations: Array<FormattedConversation>;
  createConversation: ((recipients: string[]) => void) | null;
  selectedConversationIndex: React.Dispatch<
    React.SetStateAction<number>
  > | null;
  selectedConversation: FormattedConversation | null;
  sendMessage: ((recipients: string[], text: string) => void) | null;
}

const ConversationsContext = createContext<ConversationProps>({
  conversations: [],
  createConversation: null,
  selectedConversationIndex: null,
  selectedConversation: null,
  sendMessage: null,
});

export const useConversations = () => {
  return useContext(ConversationsContext);
};

interface ProviderProps {
  id: string;
  children: JSX.Element;
}

export const ConversationsProvider = ({ id, children }: ProviderProps) => {
  const [conversations, setConversations] = useLocalStorage<Conversation[]>(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState<
    number
  >(0);
  const { contacts } = useContacts();
  const { socket } = useSocket();

  const createConversation = (recipients: string[]) => {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  };

  interface MessageProps {
    recipients: string[];
    text: string;
    sender: string;
  }

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }: MessageProps) => {
      setConversations((prevConversations) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }

          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", addMessageToConversation);

    return () => {
      socket.off("receive-message");
    };
  }, [socket, addMessageToConversation]);

  const sendMessage = (recipients: string[], text: string) => {
    socket?.emit("send-message", { recipients, text });

    addMessageToConversation({
      recipients,
      text,
      sender: id,
    });
  };

  const formattedConversations: FormattedConversation[] = conversations.map(
    (conversation, index) => {
      const recipients = conversation.recipients.map((recipient) => {
        const contact = contacts!.find((contact) => {
          return contact.id === recipient;
        });
        const name = (contact && contact.name) || recipient;
        return { id: recipient, name };
      });

      const messages = conversation.messages.map((message) => {
        const contact = contacts!.find((contact) => {
          return contact.id === message.sender;
        });
        const name = (contact && contact.name) || message.sender;
        const fromMe = id === message.sender;
        return { ...message, senderName: name, fromMe };
      });

      const selected = index === selectedConversationIndex;
      return { ...conversation, recipients, selected, messages };
    }
  );

  const value = {
    conversations: formattedConversations,
    selectedConversationIndex: setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
    createConversation,
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

const arrayEquality = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
};
