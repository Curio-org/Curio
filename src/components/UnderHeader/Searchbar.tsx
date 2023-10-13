import React, { FormEvent } from "react";
import { Input, Button } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import "./SearchBar.css";

interface SearchbarProps {
  handleFormSubmit: (termFromSearchBar: string) => void;
}

interface SearchbarState {
  term: string;
}

class Searchbar extends React.Component<SearchbarProps, SearchbarState> {
  constructor(props: SearchbarProps) {
    super(props);
    this.state = {
      term: "",
    };
  }

  handleChange = (value: string) => {
    this.setState({
      term: value,
    });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.handleFormSubmit(this.state.term);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="curio__search">
            <div className="curio__search__input">
              <Input
                onChange={this.handleChange}
                value={this.state.term}
                name="video-search"
                type="text"
                id="searchBar"
                placeholder="Search Video..."
              />
              <Button
                onClick={() => this.handleSubmit}
                type="submit"
                appearance="primary"
                size="sm"
                id="searchButton"
              >
                <SearchIcon />
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Searchbar;
