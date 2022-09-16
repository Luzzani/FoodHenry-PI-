import React from "react";

function Card({ id, name, summary, healthScore, steps, image }) {
  return (
    <div>
      <h3>{name}</h3>
      <p dangerouslySetInnerHTML={{ __html: summary }} />
      <span>{healthScore}</span>
      <img src={image} alt={name} />
      <ol>
        {steps?.map((e) => {
          return <li key={id + Math.random()}>{e.step}</li>;
        })}
      </ol>
    </div>
  );
}

export default Card;
