import React from 'react';
import { Input } from 'rsuite';
import { IconButton } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

class Searchbar extends React.Component {
    handleChange = (event) => {
        this.setState({
            term: event.target.value
        });
    
    };
    handleSubmit = event => {
        event.preventDefault();
        this.props.handleFormSubmit(this.state.term);
    }

    render() {
        
        return (
            <>
            <div className='search-bar ui segment'>
                <form onSubmit={this.handleSubmit} className='ui form'>
                    <div className='field'>
                        <label htmlFor="video-search"><h3>Video Search</h3></label>
                        {/* <Input onChange={this.handleChange} name='video-search' type="text" id='searchBar' placeholder="Search.."/> */}
                        <input onChange={this.handleChange} name='video-search' type="text" placeholder="Search.."/>
                        <IconButton onClick={this.handleSubmit} size="sm" id='searchButton' icon={<SearchIcon />} />
                    </div>
                </form>
            </div>
            </>
        )
    }
}
export default Searchbar;