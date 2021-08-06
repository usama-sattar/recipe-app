import React, { useState, useEffect } from "react";
import './App.css'
import Loader from 'react-loader-spinner'

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] =useState('')
  const [query, setQuery] =useState('chicken')

  useEffect(() => {
    getRecipe();
  }, [query]);

  const getRecipe = async () => {
    const data = await fetch(
      `https://edamam-recipe-search.p.rapidapi.com/search?q=${query}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "4d09bd9429msh332584f2d2ff7d2p1dc200jsn7f7a253fad40",
          "x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
        },
      }
    );
    const res = await data.json();
    console.log(res);
    setRecipes(res);
  };
  const searchIngrediant =(e)=>{
    setSearch(e.target.value)
 }
  const setSubmit =(e)=>{
    e.preventDefault()
    setQuery(search)
 }
 
  return (
    <div className="main">
      <Form searchIngrediant={searchIngrediant} submit={setSubmit} search={search}/>
      <RecipeContainer items={recipes.hits}/>
    </div>
  );
}

function Form(props) {
 
  return (
    <form style={{textAlign:'center '}} onSubmit={props.submit}>
      <input type="search" className="searchbar" value={props.search} onChange={props.searchIngrediant}></input>
      <input type="submit" placeholder="search recipe" className="searchbtn"></input>
    </form>
  );
}
function RecipeContainer(props) {
  return (
    <div  className="recipes">
      {props.items ? props.items.map((item) => (
            <div className="recipe">
              <h2>{item.recipe.label}</h2>
              <h4>{item.recipe.calories}</h4>
              <ol style={{listStyle:'none'}}>
                  {item.recipe.ingredients.map(ingr=> <li>{ingr.text}</li>)}
              </ol>
              <img src={item.recipe.image}></img>
            </div>
          ))
        :<Loader
        className="loader"
        type="Puff"
        color="orange"
        height={100}
        width={100}
        timeout={3000} //3 secs

     />}
    </div>
  );
}
