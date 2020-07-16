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

    const perPage = 10;
    let numPages = Math.ceil(search.data?.total_count / perPage);
    
    // for pagination
    const pageNumbers = []
    for(let i = 1; i <= numPages; i++) {
        if(numPages > 100) {
            numPages = 100;
        }
        pageNumbers.push(i)
    }

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
    const  handleSubmit = e => {
        e.preventDefault()
        search.dropDown === 'repos' ? 
            // check whether dropdown is repos or users, 
            // and then make a call to their respective URL's

            axios.get(`https://api.github.com/search/repositories?q=${search.searchTerm}&page=${search.page}&per_page=${perPage}`)
            .then(res => {
                setSearch({...search, data: res.data});
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            }) :
            
            axios.get(`https://api.github.com/search/users?q=${search.searchTerm}&page=${search.page}&per_page=${perPage}`)
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
            <p>
                {pageNumbers.map(number => (
                   <span onClick={async () => {
                       setSearch(search.page = number)
                       const res = await axios.get(`https://api.github.com/search/repositories?q=${search.searchTerm}&page=${search.page}&per_page=${perPage}`)
                       setSearch({...search, data: res.data})
                    }
                   }>
                       {number}
                    </span> 
                ))}

            </p>
        </div>
    )}

export default Search;