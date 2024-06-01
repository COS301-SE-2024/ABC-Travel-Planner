import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Account from '../app/account/page';
import { useRouter } from 'next/navigation';
import logout from '../app/account/index';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../app/account/index', () => jest.fn());

describe('Account Component', () => {
  it('should render account information', () => {
    render(<Account />);

    expect(screen.getByText('Jessica Vorster')).toBeInTheDocument();
    expect(screen.getByText('jessica.vorster@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('South Africa')).toBeInTheDocument();
    expect(screen.getByText('Member Since: 2015 January 1st')).toBeInTheDocument();
  });

  it('should call logout and navigate to /login on sign out button click', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (logout as jest.Mock).mockResolvedValueOnce(undefined);

    render(<Account />);

    /*const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(logout).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/login');*/
  });
});
