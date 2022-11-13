import React, {useState} from "react";
import  { Container, Form, Button } from "react-bootstrap";

const Twilio = () => {
    const [number, setNumber] = useState("");
    const [body, setBody] = useState("");

  return (
    <div className="twilio">
    <Container>
    <h2>Send SMS</h2>
    <Form>
      <Form.Group>
        <Form.Label htmlFor="to">To</Form.Label>
        <Form.Control value={number} onChange={(e) => setNumber(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="message">Body</Form.Label>
        <Form.Control
            as="textarea"
            rows="3"
            value={body}
            onChange={(e) => setBody(e.target.value)}
        />
      </Form.Group>
      {console.log(`Number is ${number} and the Message is ${body}`)}
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  </Container>
  </div>
  )
}

export default Twilio;