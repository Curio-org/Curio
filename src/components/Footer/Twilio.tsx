import React, { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import "./Twilio.css";

const Twilio = () => {
  const [number, setNumber] = useState("");
  const [body, setBody] = useState("");
  const [progress, setProgress] = useState(0);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setProgress(30);
    e.preventDefault();

    setProgress(60);

    const res = await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: number, body: body })
    });

    const data = await res.json();

    if (data.success) {
      setNumber("");
      setBody("");
    } else {
      setNumber("Error occurred"); 
      setBody("Error occurred");
    }
    
    setProgress(100);
  };

  return (
    <div className="request">
      <LoadingBar 
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <h2 className="gradient__text">Send Video</h2>

      <div className="request_form">
        <form onSubmit={onSubmit}>
          <input 
            value={number}
            placeholder="Enter Language"
            onChange={(e) => setNumber(e.target.value)}
          />
          
          <input
            placeholder="Enter Video URL"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <button type="submit">Send</button>        
        </form>
      </div>
    </div>
  );
};

export default Twilio;
