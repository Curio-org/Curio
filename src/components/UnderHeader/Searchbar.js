import React from 'react';
import { Input} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import './SearchBar.css'

// const styles = {
//     width: 400,
//     marginBottom: 10
// };
class Searchbar extends React.Component {
    handleChange = (event) => {
        this.setState({
            term: event
        });
    
    };
    handleSubmit = event => {
        event.preventDefault();
        this.props.handleFormSubmit(this.state.term);
    }


      
    render() {
        
        return (
            <>
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className='curio__search'>
                        <div className='curio__search__input'>
                            <Input onChange={this.handleChange} name='video-search' type="text" id='searchBar' placeholder="Search Video..."/>
                            <button onClick={this.handleSubmit} size="sm" id='searchButton'>
                                <SearchIcon />
                            </button>
                        </div>
                    </div>
                </form>
                
            </div>
            </>
        )
    }
}
export default Searchbar;