import React, { useState } from 'react'
import "./search.css"
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const [keyWord,setKeyWord] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyWord.trim()){
            navigate(`/products/${keyWord}`)
        }
        else{
            navigate(`/products`)
        }
    }
  return (
    <>
        <form className='searchBox' onSubmit={searchSubmitHandler}>
            <input type="text" placeholder='Search a Produt ...'
             onChange={(e)=>setKeyWord(e.target.value)} />
             <input type="submit" value="Search" />
        </form>
    </>
  )
}

export default Search