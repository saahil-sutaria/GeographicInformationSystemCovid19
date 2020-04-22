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

            fetch(`https://coronavirus-monitor-v2.p.rapidapi.com/coronavirus/latest_stat_by_country_name.php?country=${document.getElementById("search").value}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "coronavirus-monitor-v2.p.rapidapi.com",
                    "x-rapidapi-key": "ebf8d75e2dmsh37e9046fd3028eep14281ajsn7d548a9e63d1"
                }
            })
            .then((response) => {return response.json();})
                .then(data => {
                    console.log("Data"+data)
                    const val = data.latest_stat_by_country[0];

                    this.setState({
                        pass:document.getElementById("search").value,
                        total: val.total_cases,
                        pressed: true,
                        recover: val.total_recovered,
                        death: val.total_deaths,
                        recorded: val.record_date,
                        totalc1m:val.total_cases_per1m,
                        totald1m:val.deaths_per1m,
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
        const{ totalc1m, totald1m, chart, pass ,value, total, recover, death,pressed,recorded } =  this.state;

        if (pressed===false) {
            return (
                <div>
                    <input type="text"  id="search" ref={this.inputRef} size="40" placeholder="Country, City list coming-soon"/>
                    <button className="button is-info" type="submit" size="40" onClick={() => this.update()}>Search</button>
                    <p>{value}</p>
                </div>
            )
        }
        else{
            return (
                <div id="country">
                    <input type="text"  id="search"  ref={this.inputRef} size="40" placeholder="Country"/>
                    <button className="button is-info" size="40" type="submit" onClick={() => this.update()}>Search</button>
                    <br/>
                    <br/>
                    <h1 id="displayleft">Cases in {pass}</h1>
                    <br/>
                    <Tab total={total} recover={recover} death={death}/>
                    <br/>
                    <p> -Statistics Take at :  {recorded} (PDT)</p>


                    <Chart country={pass}/>
                </div>
            )
        }
    }
}

export default Country;
