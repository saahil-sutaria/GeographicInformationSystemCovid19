import React, {Component} from 'react';
import Tab from "./sample";

class total extends Component{
    constructor(props) {
        super(props);
        this.state ={
            total: 0,
            recovered: 0,
            death: 0,
            recorded:"",
        }
    }

    componentDidMount() {

        fetch("https://coronavirus-monitor-v2.p.rapidapi.com/coronavirus/worldstat.php", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor-v2.p.rapidapi.com",
                "x-rapidapi-key": "ebf8d75e2dmsh37e9046fd3028eep14281ajsn7d548a9e63d1"
            }
        })
            .then(response => { return (response.json())})
            .then( data => {
                console.log(data)

                this.setState({total: data.total_cases, recovered: data.total_recovered, death: data.total_deaths, recorded: data.statistic_taken_at })
            })
            .catch(err => {console.log(err);});

    }


    render(){
        const {total, recovered, death, recorded} = this.state
        return(
            <div>
                <Tab total={total} recover={recovered} death={death}/>
                <p>Statistics Take at : {recorded} (PDT)</p>
            </div>
        );
    }
}
export default total;

