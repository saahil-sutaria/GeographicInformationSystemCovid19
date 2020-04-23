import React, {Component} from 'react';
import Tab from './sample';
import './App.css'
import './App';
import Chart from './CountryCharts';


class Country extends Component{

    constructor(props) {

        super(props);
        this.state={
            country:"",
            value: "",
            total: "....Loading",
            recover: "...Loading",
            death: "...Loading",
            pressed:false,
            recorded: "...Loading",
            pass:"",
            totalc1m: 0,
            totald1m: 0,
            charts:"...Loading",
        }
        this.inputRef = React.createRef()
        this.handleChange = this.handleChange.bind(this);

    }

    update=()=>{


        if (document.getElementById("search").value===""){

            this.setState({value: alert("Enter in search bar ")})
        }
        else{

            fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${document.getElementById("search").value}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "coronavirus-monitor-v2.p.rapidapi.com",
                    "x-rapidapi-key": "ebf8d75e2dmsh37e9046fd3028eep14281ajsn7d548a9e63d1"
                }
            })
            .then((response) => {
                return response.json()})
                .then(data => {
                    const val = data.latest_stat_by_country[0];
                    this.setState({
                        pass:val.country_name,
                        total: val.total_cases,
                        pressed: true,
                        recover: val.total_recovered,
                        death: val.total_deaths,
                        recorded: val.record_date,
                        value:""
                        })
                } )
                .catch(err => {
                    this.setState({value:alert("Check your entry - Wrong Input")})
                    console.log(err);
                });
        }

    }
    handleChange(event) {
        this.setState({country: event.target.value});
    }
    componentDidMount() {
        this.inputRef.current.focus()
    }



    render(){
        const{ pass ,value, total, recover, death,pressed,recorded } =  this.state;

        if (pressed===false) {
            return (
                <div>
                    <input type="text"  id="search" ref={this.inputRef} size="40" placeholder="Search Country"/>
                    <button className="button is-info " type="submit" size="40" onClick={() => this.update()}>Search</button>
                    <p>{value}</p>

                </div>
            )
        }
        else{
            return (
                <div id="country">
                    <input type="text"  id="search"  ref={this.inputRef} size="40" placeholder="Search Country"/>
                    <button className="button is-info" size="30" type="submit" onClick={() => this.update()}>Search</button>
                    <br/>
                    <br/>
                    <h1 id="displayleft" className="text-danger bg-white card-header">Cases in {pass}</h1>
                    <br/>
                    <br/>
                    <Tab total={total} recover={recover} death={death}/>
                    <br/>
                    <p> -Statistics Take at :  {recorded} (PDT)</p>
                    <Chart country={pass}/>
                    <footer  className="card-footer bg-dark text-white-50">Sahil Sutaria - Site Under Construction .... <a data-toggle="modal" type="button" className="btn btn-light text-dark" data-target="#exampleModal">Click Here</a></footer>



                    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">How is this Webpage Built?</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body bg-dark text-white">

                                    <p>This Website is made using React.js</p>
                                    <p>Live data is fetched from COVID-19 monitor API v2.</p>
                                    <p>Chart.js for graphical representation of response data. </p>
                                    <p>Bootstrap to style components.</p>
                                    <p>Coming up - Interactive google Maps, graphs and more Styling ...</p>
                                    <p>Input Validation pending .....</p>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Country;
