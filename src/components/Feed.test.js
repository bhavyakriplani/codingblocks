import React from 'react';
import { render, screen } from '@testing-library/react';
import Feed from './Feed';
import { FeedProvider } from '../contexts/FeedContext';
import { BrowserRouter } from 'react-router-dom';

describe('Feed Component', () => {
  it('renders loading state', () => {
    render(<BrowserRouter><FeedProvider><Feed /></FeedProvider></BrowserRouter>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});