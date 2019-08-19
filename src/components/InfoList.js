import React from 'react';
import InfoItem from './InfoItem.js';
import './InfoList.css';

class InfoList extends React.Component {

    render() {

        const rows = [];
        this.props.restaurants.forEach((restaurant) => {
            const infoItem = <InfoItem
                                name={restaurant.name}
                                address={restaurant.address}
                                postCode={restaurant.postCode}
                                ratingColour={restaurant.ratingColour}
                                key={restaurant.FHRSID}
                                FHRSID={restaurant.FHRSID} />
            rows.push(infoItem);
        })
        return (
            <div className='results-list'>
                {!this.props.loading && rows}
            </div>
        );
    }

}

export default InfoList;