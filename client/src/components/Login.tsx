import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

interface Props {
  onIdSubmit: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<Props> = ({ onIdSubmit }) => {
  const idRef = useRef<any>();

  const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    onIdSubmit(idRef.current.value as string);
  };

  const createNewId = () => {
    onIdSubmit(uuidV4() as string);
  };

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>
        <Button type="submit" className="mr-2">
          Loginin
        </Button>
        <Button variant="secondary" onClick={createNewId}>
          Create A New Id
        </Button>
      </Form>
    </Container>
  );
};
export default Login;
