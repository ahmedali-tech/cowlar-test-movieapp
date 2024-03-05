import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { LogIn } from '../pages/login';
import { UserContext } from '../context/index';
import { MemoryRouter } from 'react-router-dom';
import { jest as jest_ } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import { IContext } from '../interfaces';

const mockUsedNavigate = jest_.fn();
jest_.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

// Mock the user API module
jest_.mock('../api/user');

describe('LogIn Component Unit and Functional Tests', () => {
  let mockContext: IContext;

  beforeAll(() => {
    mockContext = {
      user: null,
      updateUser: jest_.fn(),
      isLoggedIn: false,
      setIsLoggedIn: jest_.fn(),
    };
  });

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: jest_.fn(() => {
        return {
          matches: true,
          addListener: jest_.fn(),
          removeListener: jest_.fn(),
        };
      }),
    });
  });

  test('renders login form', () => {
    render(
      <UserContext.Provider value={mockContext}>
        <MemoryRouter>
          <LogIn />
        </MemoryRouter>
      </UserContext.Provider>
    );
    expect(screen.getByTestId('login-heading')).toBeInTheDocument();
  });

  test('form validation for invalid email', async () => {
    render(
      <UserContext.Provider value={mockContext}>
        <MemoryRouter>
          <LogIn />
        </MemoryRouter>
      </UserContext.Provider>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    // const buttonElement = screen.getByRole('button', { name: 'Login' });
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  test('form validation for missing password', async () => {
    render(
      <UserContext.Provider value={mockContext}>
        <MemoryRouter>
          <LogIn />
        </MemoryRouter>
      </UserContext.Provider>
    );
    fireEvent.change(screen.getByPlaceholderText('name@service.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    await waitFor(() => {
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  test('submits login form with valid data', async () => {
    await act(async () =>
      render(
        <UserContext.Provider value={mockContext}>
          <MemoryRouter>
            <LogIn />
          </MemoryRouter>
        </UserContext.Provider>
      )
    );
    fireEvent.change(screen.getByPlaceholderText('name@service.com'), {
      target: { value: 'test2@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'abcd.123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText('All Movies')).toBeInTheDocument();
      }, 2000);
    });
  });

  test('handles login error on form submission', async () => {
    await act(async () =>
      render(
        <UserContext.Provider value={mockContext}>
          <MemoryRouter>
            <LogIn />
          </MemoryRouter>
        </UserContext.Provider>
      )
    );

    fireEvent.change(screen.getByPlaceholderText('name@service.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    await waitFor(() => {
      setTimeout(() => {
        expect(screen.getByText('Wrong credentials')).toBeInTheDocument();
      }, 2000);
    });
  });
});
