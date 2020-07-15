import React, { useState } from "react";
import axios from 'axios';

const Search = () => {

    const [repos, setRepos] = useState({})
    const [search, setSearch] = useState({
        searchTerm: '',
        page: 3
    })

    const handleChange = e => {
        setSearch({
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.get(`https://api.github.com/search/repositories?q=${search.searchTerm}&page=${search.page}&per_page=10`)
        .then(res => {
            setRepos(res);
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                type='text'
                placeholder='search repo'
                onChange={handleChange}
                value={search.searchTerm}
                name='searchTerm'
                />
                <button type='submit'>search yo</button>
            </form>
            
            {console.log(repos)}

            <div>
                {repos.data?.items?.map(item => (

                    <div key={item.id}>
                        <p>{item.owner.login}</p>
                        <p>{item.created_at}</p>
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                        <p>{item.language}</p>
                        <p>{item.updated_at}</p>
                        <p>{item.url}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Search;