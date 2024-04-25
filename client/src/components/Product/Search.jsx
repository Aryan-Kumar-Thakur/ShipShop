import React, { useState } from 'react'
import "./search.css"
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

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
    <MetaData title="Search A Product -- SHIPSHOP"></MetaData>
        <form className='searchBox' onSubmit={searchSubmitHandler}>
            <input type="text" placeholder='Search a Produt ...'
             onChange={(e)=>setKeyWord(e.target.value)} />
             <input type="submit" value="Search" />
        </form>
    </>
  )
}

export default Search