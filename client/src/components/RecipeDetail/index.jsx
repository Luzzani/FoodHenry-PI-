import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, cleanPag } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./RecipeDetail.css";
import "../Home/Home.css";

function RecipeDetail(props) {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeDetail);
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(getDetail(id));

    return () => {
      dispatch(cleanPag());
    };
  }, [dispatch, id]);

  return (
    <div className="detail__container">
      <div className="detail">
        <Link to={"/home"}>
          <button
            className="filter__button"
            onClick={() => {
              props.history.goBack();
            }}
          >
            Back
          </button>
        </Link>
        <h2>{recipe.name}</h2>
        <div className="detail__image-steps">
          <img className="detail__image" src={recipe.image} alt={recipe.name} />
          <div className="detail__image-content">
            <span className="detail__span">
              Health Score: {recipe.healthScore}
            </span>
            <span className="detail__span">Diet Types: {recipe.dishTypes}</span>
            <ol className="detail__steps">
              {recipe.steps?.map((e) => {
                return <li className="detail__steps-list" key={e.number}>{e.step}</li>;
              })}
            </ol>
          </div>
        </div>
        <p
          className="detail__description"
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        ></p>
      </div>
    </div>
  );
}

export default RecipeDetail;

// <div className="detail__container">
//   <Link to={"/home"}>
//     <button
//       className="filter__button"
//       onClick={() => {
//         props.history.goBack();
//       }}
//     >
//       Back
//     </button>
//   </Link>
//   <h2>{recipe.name}</h2>
//   <div className="detail__container-image">
//     <img className="detail__image" src={recipe.image} alt={recipe.name} />
//     <div className="detail__image-content">
//       <span className="detail__span">
//         Health Score: {recipe.healthScore}
//       </span>
//       <span className="detail__span">Diet Types: {recipe.dishTypes}</span>
//       <ol className="detail__steps">
//         {recipe.steps?.map((e) => {
//           return <li key={e.number}>{e.step}</li>;
//         })}
//       </ol>
//     </div>
//     <p
//       className="detail__description"
//       dangerouslySetInnerHTML={{ __html: recipe.summary }}
//     ></p>
//   </div>
// </div>
