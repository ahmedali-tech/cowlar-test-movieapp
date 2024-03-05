import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import ReviewModal from '../components/modals/review-modal'; // Import your ReviewModal component
import { UserContext } from '../context';
import { MemoryRouter } from 'react-router-dom';
import { jest as jest_ } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import { IContext } from '../interfaces';

jest_.mock('../api/reviews', () => ({
    createReviews: jest_.fn(),
    editReview: jest_.fn(),
}));

describe('ReviewModal Component UI Tests', () => {
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
                    <ReviewModal isOpen={true} onClose={() => { }} movieId='' />
                </MemoryRouter>
            </UserContext.Provider>
        );
        expect(screen.getByText('Add review')).toBeInTheDocument();
    });

    test('displays validation error for missing comment', async () => {
        await act(async () =>
            render(
                <UserContext.Provider value={mockContext}>
                    <MemoryRouter>
                        <ReviewModal isOpen={true} onClose={() => { }} movieId="" />
                    </MemoryRouter>
                </UserContext.Provider>
            )
        );

        fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

        await waitFor(() => {
            expect(screen.getByText('Comment is required')).toBeInTheDocument();
        });
    });
});
