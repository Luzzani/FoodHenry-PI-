import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetail, cleanPag } from "../../redux/actions";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import "./RecipeDetail.css";
import "../Home/Home.css";

function RecipeDetail(props) {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeDetail);
  const recipes = useSelector((state) => state.recipes);
  const id = props.match.params.id;
  console.log({ detailAll: recipes, detailOne: recipe });

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(cleanPag());
    };
  }, [dispatch, id]);

  return (
    <div className="detail__container">
      {!recipe.name ? (
        <LoadingSpinner className='detail__spinner'/>
      ) : (
        <div className="detail__content">
          <Link to={"/home"} className="detail__content-link">
            <button
              className="filter__button"
              onClick={() => {
                props.history.goBack();
              }}
            >
              Back
            </button>
          </Link>
          <h1 className="detail__content-title">{recipe.name}</h1>
          <img
            className="detail__content-image"
            src={recipe.image}
            alt={recipe.name}
          />
          <p
            className="detail__content-summary"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          ></p>
          <ol className="detail__content-stepscontainer">
            {recipe.steps ? (
              recipe.steps.map((e) => {
                return (
                  <li className="detail__content-steps" key={e.number}>
                    <p>
                      <span>Step number {e.number}:</span> <br /> {e.step}
                    </p>
                    <ul>
                      <h4>Ingredients: </h4>
                      {e.ingredients?.length ? (
                        e.ingredients.map((e) => {
                          return <li key={e.id}>{e.name}</li>;
                        })
                      ) : (
                        <li>No ingredients</li>
                      )}
                    </ul>
                  </li>
                );
              })
            ) : (
              <p>This recipe does not have step by step</p>
            )}
          </ol>
        </div>
      )}
    </div>

    // <div className="detail__container">
    //   {!recipe.name ? (
    //     <LoadingSpinner className={"detail__spinner-center"} />
    //   ) : (
    //     <div className="detail">
    //       <Link to={"/home"}>
    //         <button
    //           className="filter__button"
    //           onClick={() => {
    //             props.history.goBack();
    //           }}
    //         >
    //           Back
    //         </button>
    //       </Link>
    //       <h2 className="detail__title">{recipe.name}</h2>
    //       <span className="detail__span">
    //         Health Score: {recipe.healthScore}
    //       </span>
    //       <span className="detail__span">
    //         Diet Types:{" "}
    //         {recipe.dishTypes ||
    //           recipe.diets?.map((e) => {
    //             return e.name + ", ";
    //           })}
    //       </span>
    //       <div className="detail__image-steps">
    //         <img
    //           className="detail__image detail__poistion"
    //           src={recipe.image}
    //           alt={recipe.name}
    //         />
    //         <div className="detail__image-content">
    //           <ol className="detail__steps detail__poistion">
    //             {recipe.steps ? (
    //               recipe.steps.map((e, i) => {
    //                 return (
    //                   <li className="detail__steps-list" key={e.number}>
    //                     {e.step}
    //                     <ol>
    //                       <p>Ingredients: </p>
    //                       {e.ingredients.map((e) => {
    //                         return <li>{e.name}</li>;
    //                       })}
    //                     </ol>
    //                   </li>
    //                 );
    //               })
    //             ) : (
    //               <p>This recipe does not have step by step</p>
    //             )}
    //           </ol>
    //         </div>
    //       </div>
    //       <p
    //         className="detail__description"
    //         dangerouslySetInnerHTML={{ __html: recipe.summary }}
    //       ></p>
    //     </div>
    //   )}
    // </div>
  );
}

export default RecipeDetail;
