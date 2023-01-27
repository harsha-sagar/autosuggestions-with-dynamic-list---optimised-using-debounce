import React from 'react';
import { useState, useCallback } from 'react';

import './style.css';
import Autocomplete from './shared/components/Autocomplete';

const debounce = (fn, delay) => {
  let timeout;
  return (sTerm) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(sTerm), delay);
  };
};

const App = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchPosts = (searchTerm) => {
    console.log('searchTerm: ', searchTerm);
    if (searchTerm) {
      fetch(
        `https://autocomplete.clearbit.com/v1/companies/suggest?query=${searchTerm}`
      )
        .then((response) => response.json())
        .then((json) => setSuggestions(json));
    } else {
      setSuggestions([]);
    }
  };

  const debounceFn = useCallback(debounce(fetchPosts, 500), []);

  return (
    <div className="wrapper">
      <Autocomplete
        suggestions={suggestions}
        fetchFn={debounceFn}
        input={input}
        setInput={setInput}
      />
    </div>
  );
};

export default App;
