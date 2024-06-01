import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SplashPage from '../app/login/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SplashPage Component', () => {
  it('should render the SplashPage component with headings', () => {
    render(<SplashPage />);

    expect(screen.getByText('Welcome to ABC Travel Planner')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('should render the Login and Register sections', () => {
    render(<SplashPage />);

    expect(screen.getByLabelText('Email address', { selector: '#loginEmail' })).toBeInTheDocument();
    expect(screen.getByLabelText('Password', { selector: '#loginPassword' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();

    expect(screen.getByLabelText('Name', { selector: '#registerName' })).toBeInTheDocument();
    expect(screen.getByLabelText('Surname', { selector: '#registerSurname' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email address', { selector: '#registerEmail' })).toBeInTheDocument();
    expect(screen.getByLabelText('Password', { selector: '#registerPassword' })).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password', { selector: '#registerConfirmPassword' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });
});
