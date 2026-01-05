import React from "react";
import "../index.css";

const generateBubbles = (count) => {
  const colors = [
    "#f0a1a8", "#a1d4f0", "#a8f0e3", "#f0e3a1", "#f0b7a1", "#a1f0c8", "#d4a1f0", "#f0a1d4"
  ];
  const bubbles = [];
  for (let i = 0; i < count; i++) {
    bubbles.push({
      size: 80 + Math.floor(Math.random() * 150),
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
  return bubbles;
};

function Background() {
  const bubbles = generateBubbles(55);

  return (
    <div className="background">
      {bubbles.map((b, index) => (
        <span
          key={index}
          className="bubble"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            top: b.top,
            left: b.left,
            backgroundColor: b.color,
          }}
        ></span>
      ))}
    </div>
  );
}

export default Background;
