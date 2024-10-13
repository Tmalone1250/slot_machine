import React, { useState } from "react";
import axios from "axios";

const symbols = ["🍒", "🍋", "🍊", "🍉", "🍇"];

function SlotMachine() {
  const [reels, setReels] = useState(["🍒", "🍒", "🍒"]);
  const [credits, setCredits] = useState(100);
  const [message, setMessage] = useState("");

  const spinReels = () => {
    axios.post("http://localhost:5000/spin", { credits })
      .then((response) => {
        setReels(response.data.reels);
        setCredits(response.data.newCredits);
        setMessage(response.data.message);
      })
      .catch((error) => console.error("Error: ", error));
  };

  return (
    <div>
      <div className="reels">
        {reels.map((symbol, index) => (
          <div key={index} className="reel">{symbol}</div>
        ))}
      </div>
      <button onClick={spinReels}>Spin</button>
      <p>Credits: {credits}</p>
      <p>{message}</p>
    </div>
  );
}

export default SlotMachine;
