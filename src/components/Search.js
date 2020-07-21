import React, { useState } from "react";
import axios from 'axios';

import Cards from './Cards';

import "../styling/Search.scss"
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
    for (let i = 1; i <= numPages; i++) {
        if (numPages > 10) {
            numPages = 10;
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

    const getData = () => {
        search.dropDown === 'repos' ?
            // check whether dropdown is repos or users, 
            // and then make a call to their respective URL's

            axios.get(`https://api.github.com/search/repositories?q=${search.searchTerm}&page=${search.page}&per_page=${perPage}`)
                .then(res => {
                    setSearch({ ...search, data: res.data });
                    console.log(res)
                })
                .catch(error => {
                    console.log(error)
                }) :

            axios.get(`https://api.github.com/search/users?q=${search.searchTerm}&page=${search.page}&per_page=${perPage}`)
                .then(res => {
                    setSearch({ ...search, data: res.data });
                })
                .catch(error => {
                    console.log(error)
                })
    }

    const handleSubmit = e => {
        e.preventDefault()
        getData()
    }

    return (
        <div>
            <h3>Welcome to Github Social!</h3>
            <h5>Search through the Github API to find Repositories or Users</h5>
            <div className="search">
                <form onSubmit={handleSubmit}>
                    <select name='dropDown' onChange={dropDownChange}>
                        <option value="repos">Repos</option>
                        <option value="users">Users</option>
                    </select>
                    <input
                        name='searchTerm'
                        type='text'
                        placeholder='Search Github'
                        onChange={handleChange}
                        value={search.searchTerm}
                    />
                    <button type='submit'>Search</button>
                </form>
            </div>

            <Cards search={search} />
            <div className="numbers-wrapper">
                {pageNumbers.map(number => (
                    <div key={number} className={`page-numbers ${search.page === number ? "active" : ""}`} onClick={async () => {
                        setSearch(search.page = number)
                        getData()
                    }
                    }>
                        {number}
                    </div>
                ))}

            </div>
        </div >
    )
}

export default Search;