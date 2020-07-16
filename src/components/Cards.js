import React from 'react';
import '../styling/Cards.scss'

const Cards = ({ search }) => {

    return(

        <div className="results">
            {search.dropDown === 'repos' ? 

                search.data?.items?.map(item => (
                    <div className="card-wrapper">
                        <div className="repo-card" key={item.id}>
                            <div className = 'img-div'>
                                <img src={item.owner.avatar_url} />
                            </div>
                            <h3>Repository name: <a href={item.html_url}>{item.name}</a></h3>
                            {/* link to project */}
                            <p>Created by: <a href={item.owner.html_url}>{item.owner.login}</a></p>
                            {/* link to user */}
                            <p>Language: {item.language}</p>
                            <p>Created on: {item.created_at}</p>
                            <p>Last updated on: {item.updated_at}</p>
                            <p>Description: {item.description}</p>
                        </div>
                    </div>
                    )) :

                search.data?.items?.map(item => (
                    <div className="repo-card" key={item.id}>
                        <p><a href={item.html_url}>{item.login}</a></p>
                        {/* link to user */}
                    </div>
                ))
            }


        </div>
    )}


export default Cards;