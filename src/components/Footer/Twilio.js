import React, {useState} from "react";

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
    <h2 style={{color:'white'}}>Send us the Video</h2>
    <form onSubmit={onSubmit}>
      <group>
        <label htmlFor="to"  style={{color:'white'}}>Language</label>
        <input value={number} onChange={(e) => setNumber(e.target.value)} />
      </group>

      <group>
        <label htmlFor="message" style={{color:'white'}}>Link to the Video</label>
        <input
            as="textarea"
            rows="3"
            value={body}
            onChange={(e) => setBody(e.target.value)}
        />
      </group>
      {console.log(`Number is ${number} and the Message is ${body}`)}
      <button variant="primary" type="submit">
        Send
      </button>
    </form>
  </div>
  )
}

export default Twilio;