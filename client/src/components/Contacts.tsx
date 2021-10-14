import React from 'react';
import { useContacts } from '../contexts/ContactsProvider';
import { ListGroup } from 'react-bootstrap';

interface Props {

}

const Contacts: React.FC<Props> = () => {
    const {contacts} = useContacts();

    return (
        <ListGroup variant='flush'>
            {contacts!.map((contact) => (
                <ListGroup.Item key={contact.id}>
                    {contact.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
export default Contacts;