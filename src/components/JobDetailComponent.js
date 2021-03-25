import React, { Component } from 'react'

export default class JobDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: []
        }
    }

    componentDidMount() {
        var that = this;
        const { match: { params } } = that.props;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var json_data = JSON.parse(this.responseText)
                that.setState({
                    description: json_data
                })
                document.getElementsByClassName('description-body')[0].innerHTML += that.state.description.description
                document.getElementsByClassName('description-body')[0].innerHTML += that.state.description.how_to_apply
            }
        }
        xhttp.open("GET", `https://jobs.github.com/positions/${params.id}.json`, true);
        xhttp.send();

    }


    render() {
        if(this.state.description.length!==0){
        var str = this.state.description.how_to_apply.slice(this.state.description.how_to_apply.indexOf('http'),this.state.description.how_to_apply.indexOf('">'))
        }
        return (
            <>
                <div className="header">
                    <div className="header-items">
                        <h1>devjobs</h1>
                        <div className="switch-mode">
                            <i className="fa fa-sun-o fa-lg" aria-hidden="true" />
                            <label className="switch">
                                <input type="checkbox" />
                                <span className="slider round" />
                            </label>
                            <i className="fa fa-moon-o fa-lg" aria-hidden="true" />
                        </div>
                    </div>
                    <div className="describe-bar">
                        <div className="job-view-describe">
                            <img src={this.state.description.company_logo} height={170} width={200} alt="IMG" />
                            <h2 className="job-view-title">{this.state.description.company}</h2>
                        </div>
                        <a href={this.state.description.company_url}><button type="button" className="job-view-site">Company Site</button></a>
                    </div>
                </div>
                <div className="description-body">
                    <div className="description-header">
                        <div className="description-title">
                            <p className="job-type">{this.state.description.type}</p>
                            <h3 className="job-title">{this.state.description.title}</h3>
                            <p className="job-location">{this.state.description.location}</p>
                        </div>
                        <div className="apply-now">
                            <a href={str}><button type="button" className="apply-now-button">Apply Now</button></a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


