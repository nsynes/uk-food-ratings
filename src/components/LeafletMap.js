import React from 'react'
import './LeafletMap.css';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { getMarkerPin } from '../MarkerPin';

class Map extends React.Component {
    constructor() {
        super();
        this.onBoundsChange = this.onBoundsChange.bind(this);
    }

    onBoundsChange(event) {
        console.log('onBoundsChange', event)
        this.getBounds();
    }

    getBounds() {
        const mapBounds = this.refs.map.leafletElement.getBounds();
        this.props.handleMapBoundsChange({
            mapBounds: mapBounds
        })
    }

    componentDidMount() {
        this.getBounds();
    }

    handleMarkerHover = (e) => {
        this.props.handleHoverOn(e.target.options.FHRSID);
    }

    render() {
        const markers = [];

        this.props.restaurants.forEach((restaurant) => {
            if ( restaurant.inView && restaurant.geocode.latitude && restaurant.geocode.longitude ) {
                const rating = parseInt(restaurant.rating) ? `${restaurant.rating} / 5` : restaurant.rating;
                markers.push(
                    <Marker
                        position={[restaurant.geocode.latitude, restaurant.geocode.longitude]}
                        icon={getMarkerPin(restaurant.ratingColour, this.props.hoverItem === restaurant.FHRSID)}
                        key={restaurant.FHRSID}
                        FHRSID={restaurant.FHRSID}
                        onMouseOver={this.handleMarkerHover}>
                        <Popup>
                            <b>{restaurant.name}</b>
                            <br/>
                            {restaurant.address},
                            <br/>
                            {restaurant.postCode}
                            <br/>
                            <br/>
                            <b>
                                Rating: <a href={`https://ratings.food.gov.uk/business/en-GB/${restaurant.FHRSID}`}
                                            target='_blank'
                                            rel="noopener noreferrer">
                                    {rating}
                                </a>
                            </b>
                            </Popup>
                    </Marker>
                );
            }
        })

        return (
            <LeafletMap
                ref='map'
                style={{height: window.innerHeight}}
                center={[55.8, -4.5]}
                zoom={5}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
                onZoomEnd={this.onBoundsChange}
                onMoveEnd={this.onBoundsChange}
            >
                <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {markers}
            </LeafletMap>
        );
    }
}

export default Map