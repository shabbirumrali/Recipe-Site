import React, { useEffect, useState } from 'react';
import Recipe from './Recipe'

const App = () => {
  const APP_ID = '15600306'
  const APP_KEY='42599d4fbe78f476435a02036f3ad1ae'

  const [ recipes, setRecipes ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ query, setQuery ] = useState('chicken')
  
  useEffect(() => {
    getRecipes()     
  }, [query])
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    setRecipes(data.hits)    
    console.log(data.hits) 
  }
  const updateChange = e => {
    setSearch(e.target.value)    
  }
  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form" >
        <input 
        type="text" 
        className="search-bar" 
        value={search} 
        onChange={updateChange} />

        <button 
        type="submit" 
        className="search-button">Search</button>
      </form>
      <div className="recipes" >
        {
          recipes.map(recipe => (          
            <Recipe 
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            />
          ))
        }
      </div>
      
    </div>   
  );
}
 
export default App;