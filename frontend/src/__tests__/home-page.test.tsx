import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../context';
import { Home } from '../pages/home';
import { IContext } from '../interfaces';
import { jest as jest_ } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';

jest_.mock('../api/movies', () => ({
    getAllMovies: jest_.fn(),
}));

describe('Home Component UI Tests', () => {

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

    let mockContext: IContext;

    beforeEach(() => {
        mockContext = {
            user: null,
            updateUser: jest_.fn(),
            isLoggedIn: true,
            setIsLoggedIn: jest_.fn(),
        };
    });

    test('get toast if logged out', async () => {
        await act(async () => {
            render(
                <UserContext.Provider value={mockContext}>
                    <MemoryRouter>
                        <Home />
                    </MemoryRouter>
                </UserContext.Provider>
            );
        });
        expect(screen.getByText("Hi, you're in guest mode!")).toBeInTheDocument();
    });
});