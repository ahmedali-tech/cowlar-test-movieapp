import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import { SignUp } from '../pages/signup';
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

describe('SignUp Component Unit and Functional Tests', () => {
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

    test('renders signup form', () => {
        render(
            <UserContext.Provider value={mockContext}>
                <MemoryRouter>
                    <SignUp />
                </MemoryRouter>
            </UserContext.Provider>
        );
        expect(screen.getByTestId('signup-heading')).toBeInTheDocument();
    });

    test('form validation for invalid email', async () => {
        render(
            <UserContext.Provider value={mockContext}>
                <MemoryRouter>
                    <SignUp />
                </MemoryRouter>
            </UserContext.Provider>
        );
        fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));
        await waitFor(() => {
            expect(screen.getByText('Email is required')).toBeInTheDocument();
        });
    });

    test('form validation for missing password', async () => {
        render(
            <UserContext.Provider value={mockContext}>
                <MemoryRouter>
                    <SignUp />
                </MemoryRouter>
            </UserContext.Provider>
        );
        fireEvent.change(screen.getByPlaceholderText('John Doe'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));
        await waitFor(() => {
            expect(screen.getByText('Password is required')).toBeInTheDocument();
        });
    });

    test('submits signup form with valid data', async () => {
        await act(async () =>
            render(
                <UserContext.Provider value={mockContext}>
                    <MemoryRouter>
                        <SignUp />
                    </MemoryRouter>
                </UserContext.Provider>
            )
        );
        fireEvent.change(screen.getByPlaceholderText('John Doe'), {
            target: { value: 'Test User' },
        });
        fireEvent.change(screen.getByPlaceholderText('name@service.com'), {
            target: { value: `jest${Math.floor(10000 + Math.random() * 90000)}@jest.com` },
        });
        fireEvent.change(screen.getByPlaceholderText('923121231234'), {
            target: { value: '923121231234' },
        });
        fireEvent.change(screen.getByPlaceholderText('••••••••'), {
            target: { value: 'jest.123' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));
        await waitFor(() => {
            setTimeout(() => {
                expect(screen.getByText('All Movies')).toBeInTheDocument();
            }, 2000);
        });
    });

    test('handles signup error on form submission', async () => {
        await act(async () =>
            render(
                <UserContext.Provider value={mockContext}>
                    <MemoryRouter>
                        <SignUp />
                    </MemoryRouter>
                </UserContext.Provider>
            )
        );

        fireEvent.change(screen.getByPlaceholderText('John Doe'), {
            target: { value: 'Test User' },
        });
        fireEvent.change(screen.getByPlaceholderText('name@service.com'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText('923121231234'), {
            target: { value: '923121231234' },
        });
        fireEvent.change(screen.getByPlaceholderText('••••••••'), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));
        await waitFor(() => {
            setTimeout(() => {
                expect(
                    screen.getByText('User with this email already exists')
                ).toBeInTheDocument();
            }, 2000);
        });
    });
});
