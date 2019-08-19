import React from 'react'
import LocateControl from './LocateControl';
import './LeafletMap.css';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { getMarkerPin } from '../MarkerPin';

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resized: false
        }
    }

    onBoundsChange = () => {
        this.getBounds();
    }

    getBounds() {
        const mapBounds = this.refs.map.leafletElement.getBounds();
        const mapRadiusMetres = mapBounds.getNorthEast().distanceTo(mapBounds.getSouthWest()) / 2;
        this.props.handleMapBoundsChange({
            mapBounds: mapBounds,
            mapRadius: this.getMiles(mapRadiusMetres)
        })
    }

    getMiles(metres) {
        return metres*0.000621371192;
   }

   shouldComponentUpdate = (nextProps, nextState) => {
        const { mapDataUpdated } = this.props;
        const { resized } = this.state;
        return resized || !mapDataUpdated ? true : false;
   }

   componentDidMount = () => {
        window.addEventListener("resize", (e) => {
            this.setState({resized: true})
        });
   }

   componentDidUpdate = () => {
        const { mapDataUpdated } = this.props;
        if ( !mapDataUpdated ) {
            this.props.confirmMapUpdated()
        }
        this.setState({resized: false})
   }

    componentDidMount() {
        this.getBounds();
    }

    render() {

        const markers = [];
        const { restaurants } = this.props;

        restaurants.forEach((restaurant) => {
            const rating = parseInt(restaurant.rating) ? `${restaurant.rating} / 5` : restaurant.rating;
            markers.push(
                <Marker
                    position={[restaurant.geocode.latitude, restaurant.geocode.longitude]}
                    icon={getMarkerPin(restaurant.ratingColour)}
                    key={restaurant.FHRSID}
                    FHRSID={restaurant.FHRSID}>
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
        })

        return (
            <LeafletMap
                ref='map'
                style={{height: window.innerHeight}}
                center={[55.8, -3]}
                zoom={6}
                maxZoom={19}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
                onZoomEnd={this.onBoundsChange}
                onMoveEnd={this.onBoundsChange}>
                <LocateControl />
                <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {markers}
            </LeafletMap>
        );
    }
}

export default Map