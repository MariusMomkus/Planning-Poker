import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import App from './App';



test('renders Login component', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  // const linkElement = screen.getAllByText("login-email");
  // expect(linkElement).toBeTruthy();
  const element = screen.getByPlaceholderText(/email@gmail.com/i);
    expect(element).toBeInTheDocument();
});
