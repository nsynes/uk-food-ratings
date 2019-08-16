import React from 'react';
import './InfoItem.css';

class Info extends React.Component {

    handleMouseEnter = () => {
        this.props.onMouseEnter(this.props.FHRSID);
    }

    render() {
        const { name, address, postCode, ratingColour, highlight } = this.props;

        var divStyle = {};
        if ( highlight ) {
            divStyle = {backgroundColor: 'grey'}
        }

        return (
            <div
                className='info-item'
                style={divStyle}
                onMouseEnter={this.handleMouseEnter}>
                <span
                    className='dot'
                    style={{backgroundColor: ratingColour}}>
                </span>
                {name},
                <br/>
                {address},
                <br/>
                {postCode}
            </div>
        );
    }

}

export default Info;