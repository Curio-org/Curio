import React, { FormEvent, useState } from "react";
import { Input, Button } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import "./SearchBar.css";

interface SearchbarProps {
  handleFormSubmit: (termFromSearchBar: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ handleFormSubmit }) => {
  const [term, setTerm] = useState<string>("");

  const handleChange = (value: string) => {
    setTerm(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFormSubmit(term);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="curio__search">
          <div className="curio__search__input">
            <Input
              onChange={handleChange}
              value={term}
              name="video-search"
              type="text"
              placeholder="Search Video..."
            />
            <Button onClick={() => handleSubmit} type="submit">
              <SearchIcon />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
