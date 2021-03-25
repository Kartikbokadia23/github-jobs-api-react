import React, { Component } from "react";
import Card from "./CardComponent";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            page: 2,
            isLoading: false
        }

        this.loadFunc = this.loadFunc.bind(this);
        this.load = this.load.bind(this);
    }

    loadFunc() {
        this.setState({
            isLoading: true
        })
        var that = this;
        var description = document.getElementById("search-description").value.trim()
        var location = document.getElementById("search-location").value.trim()
        if (location.includes(" ")) {
            location = location.replace(" ", "+");
        }
        var fullTime = document.getElementById("full-time-check").checked
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementsByClassName('load')[0].style.display = "flex"
                var json_data = JSON.parse(this.responseText);
                // console.log(json_data)
                that.setState({
                    data: json_data,
                    isLoading: false
                })

            }
        }
        xhttp.open("GET", `https://jobs.github.com/positions.json?description=${description}&location=${location}&full_time=${fullTime}`, true);
        xhttp.send();

    }

    load() {
        this.setState({
            page: this.state.page + 1
        })
        var that = this;
        var description = document.getElementById("search-description").value.trim()
        var location = document.getElementById("search-location").value.trim()
        if (location.includes(" ")) {
            location = location.replace(" ", "+");
        }
        var fullTime = document.getElementById("full-time-check").checked
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementsByClassName('load')[0].style.display = "flex"
                var json_data = JSON.parse(this.responseText);
                // console.log(json_data)
                that.setState({
                    data: that.state.data.concat(json_data)
                })

            }
        }
        xhttp.open("GET", `https://jobs.github.com/positions.json?description=${description}&location=${location}&full_time=${fullTime}&page=${that.state.page}`, true);
        xhttp.send();

    }

    switchTheme=(e)=> {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }


    componentDidMount() {
        this.loadFunc()
        if (document.getElementById("search-description").value === "" && document.getElementById("search-location").value === "") {
            document.getElementsByClassName('load')[0].style.display = "none"
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="header">
                    <div className="header-items">
                        <h1>devjobs</h1>
                        <div className="switch-mode">
                            <i className="fa fa-sun-o fa-lg" aria-hidden="true" />
                            <label className="switch" htmlFor="checkbox">
                                <input type="checkbox" id="checkbox" onChange={this.switchTheme}/>
                                <span className="slider round" />
                            </label>
                            <i className="fa fa-moon-o fa-lg" aria-hidden="true" />
                        </div>
                    </div>
                    <div className="search-bar">
                        <i className="fa fa-search fa-lg" aria-hidden="true" />
                        <input type="text" id="search-description" name="description" placeholder="Filter by title, companies, expertise" />
                        <div className="vl" />
                        <i className="fa fa-map-marker fa-lg" aria-hidden="true" />
                        <input type="text" id="search-location" name="location" placeholder="Filter by location" />
                        <div className="vl" />
                        <input type="checkbox" id="full-time-check" name="fulltimecheck" />&nbsp;
                        <label htmlFor="fulltimecheck">Full Time only</label><br />
                        <button type="button" id="search-button" onClick={this.loadFunc}>Search</button>
                    </div>
                </div>

                {
                    this.state.isLoading ? <div className="circleloader"></div> : <Card entries={this.state.data} />
                }

                <div className="load">
                    <button type="button" id="load-button" onClick={this.load}>Load More</button>
                </div>

            </React.Fragment>
        );
    }
}

export default Home;