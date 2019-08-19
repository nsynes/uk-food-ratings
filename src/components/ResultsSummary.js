import React from 'react';
import Loading from './Loading';
import './ResultsSummary.css';

class ResultsSummary extends React.Component {

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {

        const ratingArr = this.props.restaurants
            .map(restaurant => parseInt(restaurant.rating, 10))
            .filter(rating => rating);
        const meanRating = ratingArr.length > 0 ? (ratingArr.reduce((accumulator, r) => accumulator + r, 0) / ratingArr.length).toFixed(2) : '-';

        const { totalResultsOnMap, totalResults } = this.props;

        const tableData = [
            {
                'name': this.props.loading ? " " : "Premises:",
                'value': this.props.loading ? " " : totalResults
            },
            {
                'name': this.props.loading ? " " : "Premises on map:",
                'value': this.props.loading ? " " : totalResultsOnMap
            },
            {
                'name': this.props.loading ? " " : "Rated premises on map:",
                'value': this.props.loading ? " " : ratingArr.length
            },
            {
                'name': this.props.loading ? " " : "Average rating on map:",
                'value': this.props.loading ? " " : meanRating
            }]

        return (
            <div className="results-summary">
                <table className="summary-table">
                    <tbody>
                        <tr>
                            <td className="summary-text">{tableData[0].name}</td>
                            <td className="summary-text">{this.numberWithCommas(tableData[0].value)}</td>
                        </tr>
                        <tr>
                            <td className="summary-text">{tableData[1].name}</td>
                            <td className="summary-text">{this.numberWithCommas(tableData[1].value)}</td>
                        </tr>
                        <tr>
                            <td className="summary-text">{tableData[2].name}</td>
                            <td className="summary-text">{this.numberWithCommas(tableData[2].value)}</td>
                        </tr>
                        <tr>
                            <td className="summary-text">{tableData[3].name}</td>
                            <td className="summary-text">{tableData[3].value}</td>
                        </tr>
                    </tbody>
                </table>
                {this.props.loading &&
                <div className="search-loading">
                    <Loading
                        width='12px'
                        height='12px'
                    />
                </div>}
            </div>
        );
    }

}

export default ResultsSummary;