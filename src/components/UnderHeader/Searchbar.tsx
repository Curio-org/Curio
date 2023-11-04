import React, { FormEvent, useState } from "react";
import { Input, Button } from "rsuite";  
import SearchIcon from "@rsuite/icons/Search";
import LoadingBar from 'react-top-loading-bar';
import "./SearchBar.css";

interface SearchbarProps {
  handleFormSubmit: (termFromSearchBar: string) => void; 
}

const Searchbar: React.FC<SearchbarProps> = ({ handleFormSubmit }) => {
  const [term, setTerm] = useState<string>("");
  const [progress, setProgress] = useState(0);

  const handleChange = (value: string) => {
    setTerm(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProgress(30);
    handleFormSubmit(term);
    setProgress(100);
  };

  return (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress} 
        height={3}
      />
      
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
