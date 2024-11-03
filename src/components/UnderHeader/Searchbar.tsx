import React, { FormEvent, useState, useRef } from "react";
import { Input, Button } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import LoadingBar from 'react-top-loading-bar';
import "./SearchBar.css";

interface SearchbarProps {
  handleFormSubmit: (termFromSearchBar: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ handleFormSubmit }) => {
  const [term, setTerm] = useState<string>("");
  const loadingBarRef = useRef<any>(null); 

  const handleChange = (value: string) => {
    setTerm(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loadingBarRef.current.continuousStart(); 
    handleFormSubmit(term);

    setTimeout(() => {
      loadingBarRef.current.complete();
    }, 300); 
  };

  return (
    <div>
      <LoadingBar color="#f11946" height={3} ref={loadingBarRef} />
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
            <Button type="submit">
              <SearchIcon />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
