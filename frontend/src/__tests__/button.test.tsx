// import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BasicButton from '../components/button/basic-button';
import { jest } from '@jest/globals'
import '@testing-library/jest-dom/extend-expect'
/** @jest-environment jsdom */

describe('BasicButton Component', () => {

    test('renders button with text', () => {
        render(<BasicButton isLoading={false} text="Click me" loadingText="Loading" />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('Click me');
    });


    test('renders LoadingIcon when isLoading is true', () => {
        const { getByTestId } = render(
            <BasicButton isLoading={true} text="Click Me" loadingText="Loading..." />
        );

        // Verify that LoadingIcon is rendered when isLoading is true
        const loadingIcon = getByTestId('loading-icon');
        expect(loadingIcon).toBeInTheDocument();
    });


    test('calls onClick handler', () => {
        const onClickMock = jest.fn();
        render(<BasicButton isLoading={false} text="Click me" loadingText="Loading" onClick={onClickMock} />);
        const buttonElement = screen.getByRole('button');
        fireEvent.click(buttonElement);
        expect(onClickMock).toHaveBeenCalled();
    });


    test('disables button', () => {
        render(<BasicButton isLoading={false} disabled={true} text="Click me" loadingText="Loading" />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeDisabled();
    });


    test('renders button with orange color', () => {
        render(<BasicButton isLoading={false} text="Click me" loadingText="Loading" color={true} />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveClass('bg-orange-700');
    });


    test('renders loading state with wait cursor', () => {
        render(<BasicButton isLoading={true} text="Click me" loadingText="Loading" />);
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveClass('cursor-wait');
    });
});
