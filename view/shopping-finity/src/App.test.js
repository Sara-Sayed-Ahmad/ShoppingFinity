import { render, screen } from '@testing-library/react';
import router from './router';

test('renders learn react link', () => {
  render(<router />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
