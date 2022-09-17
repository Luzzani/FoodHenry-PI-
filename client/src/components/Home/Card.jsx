import React from "react";
import { Link } from "react-router-dom";

function Card({ name, healthScore, image, id }) {
  return (
    <div>
      <Link to={`/detail/${id}`}><h3>{name}</h3></Link>
      <span>{healthScore}</span>
      <img src={image} alt={name} />
    </div>
  );
}

export default Card;
