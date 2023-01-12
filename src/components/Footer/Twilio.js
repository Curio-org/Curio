import React, {useState} from "react";
import './Twilio.css'

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

  <div className="request">
    <h2 className="gradient__text">Send us the Video</h2>
    <div className="request_form">
      <form onSubmit={onSubmit}>
          <input value={number} placeholder="Enter The Language" onChange={(e) => setNumber(e.target.value)} />
          <input as="textarea" rows="3" placeholder="Enter the URL of Video" value={body} onChange={(e) => setBody(e.target.value)} />
          {/* {console.log(`Number is ${number} and the Message is ${body}`)} */}
          <button variant="primary" type="submit">Send</button>
      </form>
    </div>
  </div>
  )
}

export default Twilio;