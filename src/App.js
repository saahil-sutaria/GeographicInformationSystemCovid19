import React,{useState, Component} from 'react';
import './App.css';
import Total from './total';
import Country from  './country'


import './country'

class App extends Component {

    constructor(props) {
        super(props);

    }

    render(){
        return(
                <div className="App" >
                    <br />
                    <h1 id="displayleft">Global COVID-19 Statistics</h1>
                    <br/>
                    <Total />
                    <Country/>
                </div>


        );

    }

}

export default App;
