import React from "react";
import { Link } from "react-router-dom";
import './Home.css'

function Card({ name, healthScore, image, id }) {
  return (
    <div className="card__content card__hover-effect">
      <Link to={`/detail/${id}`}>
        <h3 className="card__title">{name}</h3>
      </Link>
      <span className="card__healthscore">Health Score:{healthScore}</span>
      <img className="card__image" src={image} alt={name} />
      <Link to={`/detail/${id}`}>
        <button className="card__title card__title-recipe">Recipe</button>
      </Link>
    </div>
  );
}

export default Card;
