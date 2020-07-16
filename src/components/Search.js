import React, { useState } from "react";
import axios from 'axios';

import Cards from './Cards';

const Search = () => {

    const [search, setSearch] = useState({
        searchTerm: '',
        page: 1,
        dropDown: 'repos',
        data: {}
    })

    const handleChange = e => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
        })
    }
    const dropDownChange = e => {
        setSearch({
            ...search,
            dropDown: e.target.value,
            searchTerm: '',
            data: {}
        })
    }
    const handleSubmit = e => {
        e.preventDefault()
        search.dropDown === 'repos' ? 
            // check whether dropdown is repos or users, 
            // and then make a call to their respective URL's

            axios.get(`https://api.github.com/search/repositories?q=${search.searchTerm}&page=${search.page}&per_page=10`)
            .then(res => {
                setSearch({...search, data: res.data});
            })
            .catch(error => {
                console.log(error)
            }) :
            
            axios.get(`https://api.github.com/search/users?q=${search.searchTerm}&page=${search.page}&per_page=10`)
            .then(res => {
                setSearch({...search, data: res.data});
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <select name='dropDown' onChange={dropDownChange}>
                    <option value="repos">Repos</option>
                    <option value="users">Users</option>
                </select>
                <input 
                    name='searchTerm'
                    type='text'
                    placeholder='search repo'
                    onChange={handleChange}
                    value={search.searchTerm}
                />
                <button type='submit'>search yo</button>
            </form>

            <Cards search={search} />
            
        </div>
    )}

export default Search;