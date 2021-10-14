export type Contact = {
    id: string,
    name: string,
}

export type Message = {
    sender: string,
    text: string,
    senderName?: string,
    fromMe?: boolean,
}

export type Conversation = {
    recipients: string[],
    messages: Message[],
}

export type FormattedConversation = {
    recipients: {
        id: string;
        name: string;
    }[];
    selected: boolean;
    messages: Message[];
};