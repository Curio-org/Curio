import React from 'react';
import { Input , InputGroup} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const styles = {
    width: 400,
    marginBottom: 10
};
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
                    <div>
                        <InputGroup style={styles}>
                            <Input onChange={this.handleChange} name='video-search' type="text" id='searchBar' placeholder="Search Youtube Video With KeyWord"/>
                            <InputGroup.Button onClick={this.handleSubmit} size="sm" id='searchButton'>
                                <SearchIcon />
                            </InputGroup.Button>
                        </InputGroup>
                    </div>
                </form>
                
            </div>
            </>
        )
    }
}
export default Searchbar;