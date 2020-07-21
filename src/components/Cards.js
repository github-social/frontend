import React from 'react';
import '../styling/Cards.scss';
import dayjs from "dayjs";

const Cards = ({ search }) => {

    return (

        <div className="results">
            {search.dropDown === 'repos' ?

                search.data?.items?.map(item => (
                    <div key={item.id} className="card-wrapper">
                        <div className="repo-card">
                            <div className='img-div'>
                                <a href={item.owner.html_url}>
                                    <img src={item.owner.avatar_url} />
                                </a>
                            </div>
                            <h5><a href={item.owner.html_url}>{item.owner.login}</a></h5>
                            <h3>Repo name: <a href={item.html_url}>{item.name}</a></h3>
                            {/* link to project */}
                            {/* link to user */}
                            <div className="dates">
                                <p>Created on: {dayjs(item.created_at).format('M/D/YYYY')}</p>
                                <p>Last updated on: {dayjs(item.updated_at).format('M/D/YYYY')}</p>
                            </div>
                            <button><a href={item.html_url}>View Repo</a></button>
                            <p>Description: {item.description}</p>
                            <p>Language: {item.language}</p>
                        </div>
                    </div>
                )) :

                search.data?.items?.map(item => (
                    <div key={item.id} className="card-wrapper">
                        <div className="repo-card" key={item.id}>
                            <div className='img-div'>
                                <img src={item.avatar_url} />
                            </div>
                            <p>User: <a href={item.html_url}>{item.login}</a></p>
                            <div className="follow">
                                <p><a href={item.followers_url}>Followers</a></p>
                                <p><a href={item.following_url}>Following</a></p>
                            </div>
                            <p><a href={item.organizations_url}>Organizations</a></p>
                            <p><a href={item.starred_url}>Starred Repos</a></p>
                            {/* link to user */}
                        </div>
                    </div>
                ))
            }


        </div>
    )
}


export default Cards;