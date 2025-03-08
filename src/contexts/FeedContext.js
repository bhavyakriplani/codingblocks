import React, { createContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const parentRef = useRef();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?q=${searchQuery}`
        );
        setPosts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [searchQuery]);

  const value = {
    posts,
    setPosts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    scrollPosition,
    setScrollPosition,
    parentRef,
  };

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
};