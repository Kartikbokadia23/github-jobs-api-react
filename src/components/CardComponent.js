import React from "react";
import { Link } from 'react-router-dom';
function Card(props) {
    if (props.entries.length === 0) {
        return (
            <div></div>
        )
    }
    else
    return (
        <div id="card-body">
            {
                props.entries.map((entry) => {
                    return (
                        <Link to = {`/job/${entry.id}`} key={entry.id}>
                        <div className="card">
                            <p className="job-type" id={entry.id}>{entry.type}</p>
                            <img className="job-company-logo" src={entry.company_logo} alt="logo"></img>
                            <h3 className="job-title">{entry.title}</h3>
                            <p className="job-company">{entry.company}</p>
                            <p className="job-location">{entry.location}</p>
                        </div>
                        </Link>
                    );
                })
            }
        </div>
    )
}

export default Card;
