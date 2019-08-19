import React from 'react';
import Search from './Search';
import ResultsSummary from './ResultsSummary';
import InfoList from './InfoList';
import './SearchAndInfo.css';

class SearchAndInfo extends React.Component {

    handleSearchQueryChange = (searchQuery) => {
        this.props.handleSearchQueryChange(searchQuery)
    }

    render() {

        return (
            <div className='box-one-flex'>
                <Search
                    loading={this.props.loading}
                    searchQuery={this.props.searchQuery}
                    handleSearchQueryChange={this.handleSearchQueryChange} />
                <ResultsSummary
                    loading={this.props.loading}
                    restaurants={this.props.restaurants}
                    totalResultsOnMap={this.props.totalResultsOnMap}
                    totalResults={this.props.totalResults} />
                <InfoList
                    loading={this.props.loading}
                    restaurants={this.props.restaurants} />
            </div>
        );
    }

}

export default SearchAndInfo;