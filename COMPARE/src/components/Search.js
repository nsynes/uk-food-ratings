import React from 'react';
import './Search.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.searchInput = React.createRef();
      }

    handleSubmitQuery = (event) => {
        event.preventDefault();
    }

    handleClick = (event) => {
        if(event.key === 'Enter' || !event.key ) {
            this.props.handleSearchQueryChange(this.searchInput.current.value)
        }
    }

    render() {

        return (
            <div className="search-container">
                <input
                    className="search-input"
                    ref={this.searchInput}
                    type="text"
                    placeholder="keywords or leave empty"
                    onKeyPress={this.handleClick}/>
                <span
                    className="search-icon"
                    onClick={this.handleClick}/>
            </div>
        );
    };

}


export default Search;