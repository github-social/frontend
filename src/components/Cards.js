import React from 'react';
import '../styling/Cards.scss';
import dayjs from "dayjs";

const Cards = ({ search }) => {

    return (

        <div className="results">
            {search.dropDown === 'repos' ?

                search.data?.items?.map(item => (
                    <div className="card-wrapper">
                        <div className="repo-card" key={item.id}>
                            <div className='img-div'>
                                <img src={item.owner.avatar_url} />
                            </div>
                            <h3>Repository name: <a href={item.html_url}>{item.name}</a></h3>
                            {/* link to project */}
                            <p>Created by: <a href={item.owner.html_url}>{item.owner.login}</a></p>
                            {/* link to user */}
                            <div className="dates">
                                <p>Created on: {dayjs(item.created_at).format('M/D/YYYY')}</p>
                                <p>Last updated on: {dayjs(item.updated_at).format('M/D/YYYY')}</p>
                            </div>
                            <p>Description: {item.description}</p>
                            <p>Language: {item.language}</p>
                        </div>
                    </div>
                )) :

                search.data?.items?.map(item => (
                    <div className="card-wrapper">
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