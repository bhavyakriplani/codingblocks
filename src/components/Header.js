import React, { useState } from 'react';
import debounce from 'lodash.debounce';

function Header({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = debounce((query) => {
    if (onSearch) {
      onSearch(query);
    }
  }, 300);

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    handleSearch(query);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header>
      <button onClick={handleRefresh}>Refresh</button>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleChange}
      />
    </header>
  );
}

export default Header;