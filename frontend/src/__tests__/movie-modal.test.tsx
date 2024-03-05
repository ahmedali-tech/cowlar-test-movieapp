import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import MovieModal from '../components/modals/movie-modal'; // Import your MovieModal component
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

// Mock the movies API module
jest_.mock('../api/movies', () => ({
    createMovies: jest_.fn(),
}));

describe('MovieModal Component Unit and Functional Tests', () => {
    let mockContext: IContext;

    beforeEach(() => {
        mockContext = {
            user: null,
            updateUser: jest_.fn(),
            isLoggedIn: true,
            setIsLoggedIn: jest_.fn(),
        };
    });

    test('renders movie modal', () => {
        render(
            <UserContext.Provider value={mockContext}>
                <MemoryRouter>
                    <MovieModal isOpen={true} onClose={() => { }} onSubmit={() => { }} />
                </MemoryRouter>
            </UserContext.Provider>
        );
        expect(screen.getByText('Add Movie')).toBeInTheDocument();
    });

    test('displays validation error for missing movie name', async () => {
        await act(async () =>
            render(
                <UserContext.Provider value={mockContext}>
                    <MemoryRouter>
                        <MovieModal isOpen={true} onClose={() => { }} onSubmit={() => { }} />
                    </MemoryRouter>
                </UserContext.Provider>
            )
        );

        fireEvent.click(screen.getByRole('button', { name: 'Create' }));

        await waitFor(() => {
            expect(screen.getByText('Name is required')).toBeInTheDocument();
        });
    });

    test('displays validation error for invalid release year', async () => {
        await act(async () =>
            render(
                <UserContext.Provider value={mockContext}>
                    <MemoryRouter>
                        <MovieModal isOpen={true} onClose={() => { }} onSubmit={() => { }} />
                    </MemoryRouter>
                </UserContext.Provider>
            )
        );

        fireEvent.change(screen.getByPlaceholderText('Release Year'), {
            target: { value: 'invalidYear' },
        });

        fireEvent.click(screen.getByRole('button', { name: 'Create' }));

        await waitFor(() => {
            expect(screen.getByText('Release Year must be a number')).toBeInTheDocument();
        });
    });

    test('displays validation error for invalid genre', async () => {
        await act(async () =>
            render(
                <UserContext.Provider value={mockContext}>
                    <MemoryRouter>
                        <MovieModal isOpen={true} onClose={() => { }} onSubmit={() => { }} />
                    </MemoryRouter>
                </UserContext.Provider>
            )
        );

        fireEvent.click(screen.getByRole('button', { name: 'Create' }));

        await waitFor(() => {
            expect(screen.getByText('Please select a genre')).toBeInTheDocument();
        });
    });


});
