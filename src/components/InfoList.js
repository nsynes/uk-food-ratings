import React from 'react';
import InfoItem from './InfoItem.js';
import './InfoList.css';

class InfoList extends React.Component {

    handleInfoItemHover = (id) => {
        this.props.handleHoverOn(id);
    }

    render() {

        const rows = [];
        this.props.restaurants.forEach((restaurant) => {
            if ( restaurant.inView ) {
                const infoItem = <InfoItem
                                    name={restaurant.name}
                                    address={restaurant.address}
                                    postCode={restaurant.postCode}
                                    ratingColour={restaurant.ratingColour}
                                    key={restaurant.FHRSID}
                                    FHRSID={restaurant.FHRSID}
                                    highlight={this.props.hoverItem === restaurant.FHRSID}
                                    onMouseEnter={this.handleInfoItemHover} />
                rows.push(infoItem);
            }
        })

        return (
            <div className='results-list'>
                {rows}
            </div>
        );
    }

}

export default InfoList;