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
        this.props.handleSearchQueryChange(this.searchInput.current.value)
    };

    render() {
        return (
            <form className='search-container' onSubmit={this.handleSubmitQuery}>
                <input
                    className="search-input"
                    ref={this.searchInput}
                    type="text"
                    placeholder="keywords"
                />
                <button onClick={this.handleClick}>Search</button>
            </form>
        );
    };

}


export default Search;