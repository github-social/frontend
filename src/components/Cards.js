import React from 'react';

const Cards = ({ search }) => {
    return(

        <div>
            {search.dropDown === 'repos' ? 
                search.data?.items?.map(item => (
                    <div className="repo-card" key={item.id}>
                        <p><a href={item.owner.html_url}>{item.owner.login}</a></p>
                        {/* link to user */}
                        <p>{item.created_at}</p>
                        <p><a href={item.html_url}>{item.name}</a></p>
                        {/* link to project */}
                        <p>{item.description}</p>
                        <p>{item.language}</p>
                        <p>{item.updated_at}</p>
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