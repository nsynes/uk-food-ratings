import React from 'react';
import SearchAndInfo from './components/SearchAndInfo';
import Map from './components/LeafletMap';
import './App.css';
import { API_URL_search } from './config';
import { handleResponse } from './helpers';
import { MARKER_COLOURS } from './MarkerColours';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapDataUpdated: false,
            loading: false,
            searchQuery: '',
            mapBounds: {},
            restaurants: [],
            totalResultsOnMap: 0,
            totalResults: 0
        };
    }

    handleMapBoundsChange = (mapInfo) => {
        const { restaurants } = this.state;
        this.setState({
            restaurants: restaurants,
            mapBounds: mapInfo.mapBounds,
            mapRadius: mapInfo.mapRadius
        });
    }

    handleSearchRestaurantsChange = (restaurants) => {
        this.setState({
            restaurants: restaurants
        });
    }

    confirmMapUpdated = () => {
        this.setState({
            mapDataUpdated: true
        })
    }

    /*componentDidMount = () => {
        this.setState({
            restaurants: this.props.restaurants
        })
    }*/

    getMiles(metres) {
        return metres*0.000621371192;
   }

   checkInView(lon, lat, bounds) {
        const { _northEast, _southWest } = bounds;
        const inView = lon < _northEast.lng && lat < _northEast.lat && lon > _southWest.lng && lat > _southWest.lat;
        return inView;
   }

   fetchRestaurants = (searchQuery) => {

        this.setState({
            mapDataUpdated: false,
            loading: true,
            searchQuery: searchQuery
        });

        const options = {
            headers: new Headers({
                'x-api-version': 2
            })
        }

        const { _northEast, _southWest } = this.state.mapBounds;
        const { mapRadius } = this.state;
        const centerLon = (_northEast.lng + _southWest.lng) / 2;
        const centerLat = (_northEast.lat + _southWest.lat) / 2;

        // API sorting options: "sortOptionKey"=["Relevance","rating","desc_rating","alpha","desc_alpha","Distance"]
        const url = `${API_URL_search}?name=${searchQuery}&longitude=${centerLon}&latitude=${centerLat}&maxDistanceLimit=${Math.ceil(mapRadius)}&sortOptionKey=alpha&pageNumber=1&pageSize=1000`;
        console.log('API url',url)

        fetch(url, options)
        .then(handleResponse)
        .then((result) => {

            const restaurants = result.establishments
                .filter((establishment) => establishment.Distance <= mapRadius)
                //    {return establishment.geocode.latitude > _southWest.lat && establishment.geocode.longitude > _southWest.lng &&
                //        establishment.geocode.latitude < _northEast.lat && establishment.geocode.longitude < _northEast.lng ?
                //        true: false;})
                .map(estab => {
                    const rating = parseInt(estab.RatingValue);
                    const ratingColour = rating <= 5 ? MARKER_COLOURS[rating] : '#a9a9a9';
                    const address = [estab.AddressLine1,estab.AddressLine2,estab.AddressLine3].filter(Boolean).join(', ')

                    return {
                        address: address,
                        businessType: estab.BusinessType,
                        businessTypeID: estab.BusinessTypeID,
                        FHRSID: estab.FHRSID,
                        geocode: estab.geocode,
                        name: estab.BusinessName,
                        postCode: estab.PostCode,
                        rating: estab.RatingValue,
                        ratingColour: ratingColour,
                        ratingDate: estab.RatingDate
                    }
                });

                const totalResultsOnMap = result.meta.itemCount;
                const totalResults = result.meta.totalCount;

            this.setState({
                loading: false,
                restaurants: restaurants,
                totalResultsOnMap: totalResultsOnMap,
                totalResults: totalResults
            });
        })
        .catch((error) => {
            this.setState({
                loading: false,
            })
        });
    }


    render() {
        const { loading, restaurants, totalResultsOnMap, totalResults, mapBounds, mapRadius, mapDataUpdated } = this.state;

        return (
            <div className="app">
                <div align="center" className='box-one'>
                <SearchAndInfo
                    loading={loading}
                    restaurants={restaurants}
                    totalResultsOnMap={totalResultsOnMap}
                    totalResults={totalResults}
                    searchQuery={this.props.searchQuery}
                    handleSearchQueryChange={this.fetchRestaurants} />
                </div>
                <div className='box-two'>
                    <Map
                        mapDataUpdated={mapDataUpdated}
                        confirmMapUpdated={this.confirmMapUpdated}
                        restaurants={restaurants}
                        mapBounds={mapBounds}
                        mapRadius={mapRadius}
                        handleMapBoundsChange={this.handleMapBoundsChange} />
                </div>
            </div>
        );

    }

}

export default App;



