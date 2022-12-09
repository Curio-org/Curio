import React, {useState} from "react";
import  { Container, Form, Button } from "react-bootstrap";

const Twilio = () => {
    const [number, setNumber] = useState("");
    const [body, setBody] = useState("");

    const onSubmit = async (e) => {
        await e.preventDefault();
    
        const res = await fetch("/api/sendMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ to: number, body: body }),
        });
    
        const data = await res.json();
    
        if (data.success) {
          await setNumber("");
          await setBody("");
        } else {
          await setNumber("An Error has occurred.");
          await setBody("An Error has occurred.");
        }
      };

  return (
    <div className="twilio">
    <Container>
    <h2 style={{color:'white'}}>Send us the Video</h2>
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label htmlFor="to"  style={{color:'white'}}>Language</Form.Label>
        <Form.Control value={number} onChange={(e) => setNumber(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="message" style={{color:'white'}}>Link to the Video</Form.Label>
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