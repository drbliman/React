import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageLinc from '../component/main/pageLink';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ idPage: '1' }),
}));

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <Router>
      <Routes>
        <Route path="*" element={ui} />
      </Routes>
    </Router>
  );
};

describe('PageLinc', () => {
  test('updates URL query parameter when page changes', () => {
    renderWithRouter(<PageLinc num={30} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    const secondPageLink = screen.getByText('2');
    fireEvent.click(secondPageLink);

    expect(window.location.pathname).toBe('/main/null/null/page/2');

    const secondPageLink1 = screen.getByText('3');
    fireEvent.click(secondPageLink1);

    expect(window.location.pathname).toBe('/main/null/null/page/3');
  });
});