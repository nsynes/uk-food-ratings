import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

/*
var tester = [{
    FHRSID: 558785,
    address: "133 Oxclose Lane, Arnold, Nottinghamshire",
    businessType: "Takeaway/sandwich shop",
    businessTypeID: 7844,
    geocode: {longitude: "-1.146823", latitude: "52.999475"},
    name: "Indian  Spice",
    postCode: "NG5 6FN",
    rating: "5",
    ratingColour: "#007000",
    ratingDate: "2019-07-02T00:00:00"},
    {
    FHRSID: 241659,
    address: "50 Warwick Road",
    businessType: "Restaurant/Cafe/Canteen",
    businessTypeID: 1,
    geocode: {longitude: "-1.577643", latitude: "52.340833"},
    name: "Indian Edge",
    postCode: "CV8 1HH",
    rating: "5",
    ratingColour: "#007000",
    ratingDate: "2018-11-21T00:00:00"}]
*/

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
