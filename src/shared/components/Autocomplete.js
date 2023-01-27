import React from 'react';
import { useState } from 'react';

const AutoComplete = ({ suggestions, fetchFn, input, setInput }) => {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const onChange = (e) => {
    const userInput = e.target.value;

    fetchFn(userInput);
    setInput(e.target.value);
    setShowSuggestions(true);
  };

  const onClick = (suggestion) => {
    setInput(suggestion.name);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const onKeyDown = (e) => {
    if (suggestions.length == -1) {
      return;
    }

    // User pressed the enter key
    if (e.keyCode === 13) {
      setInput(suggestions[activeSuggestionIndex].name);
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
    }

    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }

    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestionIndex - 1 === suggestions.length) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const SuggestionsListComponent = () => {
    return suggestions.length ? (
      <ul className="suggestions">
        {suggestions.map((suggestion, index) => {
          return (
            <li
              key={suggestion.domain}
              className={
                index === activeSuggestionIndex ? 'suggestion-active' : ''
              }
              onClick={() => onClick(suggestion)}
            >
              <img src={suggestion.logo} width="50" height="50" />
              {suggestion.name}
            </li>
          );
        })}
      </ul>
    ) : (
      <div class="no-suggestions">
        <em>No suggestions</em>
      </div>
    );
  };

  return (
    <>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      {input && showSuggestions && <SuggestionsListComponent />}
    </>
  );
};

export default AutoComplete;
