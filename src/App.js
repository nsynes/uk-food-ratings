import React from 'react';
import Search from './components/Search.js';
import InfoList from './components/InfoList.js';
import Map from './components/LeafletMap.js';
import './App.css';
import { API_URL_search } from './config';
import { handleResponse } from './helpers';
import { MARKER_COLOURS } from './MarkerColours';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            searchQuery: '',
            mapBounds: {},
            restaurants: [],
            hoverItem: ''
        };
        this.handleSearchQueryChange = this.handleSearchQueryChange.bind(this);
        this.handleSearchRestaurantsChange = this.handleSearchRestaurantsChange.bind(this);
        this.handleMapBoundsChange = this.handleMapBoundsChange.bind(this);
    }

    handleMapBoundsChange(mapInfo) {
        const { restaurants } = this.state;
        restaurants.forEach((establishment) => {
            establishment.inView = this.checkInView(establishment.geocode.longitude, establishment.geocode.latitude, mapInfo.mapBounds)
        })
        this.setState({
            restaurants: restaurants,
            mapBounds: mapInfo.mapBounds
        });
    }

    getMiles(metres) {
        return metres*0.000621371192;
   }

   checkInView(lon, lat, bounds) {
       const { _northEast, _southWest } = bounds;

       if ( lon < _northEast.lng && lat < _northEast.lat && lon > _southWest.lng && lat > _southWest.lat ) {
           return true;
       }
       return false;

   }

    handleSearchQueryChange(searchQuery) {
        this.setState({
            searchQuery: searchQuery
        });

        if ( searchQuery && searchQuery !== '' ) {

            const options = {
                headers: new Headers({
                    'x-api-version': 2
                })
            }
            const url = `${API_URL_search}?name=${searchQuery}`;
            //?address=${searchQuery}`;//&longitude=${mapCenterLon}&latitude=${mapCenterLat}&maxDistanceLimit=${mapRadiusMiles}`;
            console.log('API url',url)

            fetch(url, options)
            .then(handleResponse)
            .then((result) => {

                const restaurants = [];
                result.establishments.forEach((establishment) => {
                    const rating = parseInt(establishment.RatingValue);
                    const ratingColour = rating <= 5 ? MARKER_COLOURS[rating] : '#a9a9a9';
                    const address = [establishment.AddressLine1,establishment.AddressLine2,establishment.AddressLine3].filter(Boolean).join(', ')

                    const inView = this.checkInView(establishment.geocode.longitude, establishment.geocode.latitude, this.state.mapBounds)

                    restaurants.push({
                        address: address,
                        businessType: establishment.BusinessType,
                        businessTypeID: establishment.BusinessTypeID,
                        FHRSID: establishment.FHRSID,
                        geocode: establishment.geocode,
                        inView: inView,
                        name: establishment.BusinessName,
                        postCode: establishment.PostCode,
                        rating: establishment.RatingValue,
                        ratingColour: ratingColour,
                        ratingDate: establishment.RatingDate
                    })
                })

                this.setState({
                    restaurants: restaurants,
                });
            });
        }
    }

    handleSearchRestaurantsChange(restaurants) {
        this.setState({
            restaurants: restaurants
        });
    }

    handleHoverOn = (id) => {
        this.setState({
            hoverItem: id
        })
    }

    render() {

        return (
            <div className="app">
                <div className='box-one'>
                    <div className='box-one-flex'>
                        <Search
                            searchQuery={this.props.searchQuery}
                            handleSearchQueryChange={this.handleSearchQueryChange} />
                        <InfoList
                            restaurants={this.state.restaurants}
                            hoverItem={this.state.hoverItem}
                            handleHoverOn={this.handleHoverOn} />
                    </div>
                </div>
                <div className='box-two'>
                    <Map
                        restaurants={this.state.restaurants}
                        mapBounds={this.state.mapBounds}
                        handleMapBoundsChange={this.handleMapBoundsChange}
                        hoverItem={this.state.hoverItem}
                        handleHoverOn={this.handleHoverOn} />
                </div>
            </div>
        );

    }

}

export default App;



