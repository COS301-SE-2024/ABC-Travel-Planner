import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Help from '../app/help/page'; 
import { useTheme } from '../app/context/ThemeContext';

jest.mock('../app/context/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('Help Component', () => {
  beforeEach(() => {
    // Provide a mock implementation for useTheme
    (useTheme as jest.Mock).mockReturnValue({
      selectedTheme: 'beach',
      themeStyles: {
        background: '#ffffff',
        textColor: '#000000',
      },
      setTheme: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders the main heading', () => {
    render(<Help />);
    const mainHeading = screen.getByRole('heading', { name: /Help Centre/i });
    expect(mainHeading).toBeInTheDocument();
  });

  it('renders the steps to book a trip', () => {
    render(<Help />);
    const stepsHeading = screen.getByRole('heading', { name: /Steps to Book a Trip/i });
    expect(stepsHeading).toBeInTheDocument();
  });

  it('renders the FAQs section', () => {
    render(<Help />);
    const faqHeading = screen.getByRole('heading', { name: /Frequently Asked Questions/i });
    expect(faqHeading).toBeInTheDocument();

    const faqQuestions = [
      'How do I book a flight?',
      'Can I cancel my booking?',
      'Are there any hidden fees?'
    ];

    faqQuestions.forEach(question => {
      expect(screen.getByText(question)).toBeInTheDocument();
    });
  });

  it('renders the contact section', () => {
    render(<Help />);
    const contactHeading = screen.getByRole('heading', { name: /Contact Us/i });
    expect(contactHeading).toBeInTheDocument();

    expect(screen.getByText('techtitans.capstone@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('081 586 3228')).toBeInTheDocument();
    expect(screen.getByText('063 244 1519')).toBeInTheDocument();
  });

  it('renders the video section', () => {
    render(<Help />);
    const videoHeading = screen.getByRole('heading', { name: /Need more information\? Watch Me!/i });
    expect(videoHeading).toBeInTheDocument();
    
    const iframe = screen.getByTitle('ABC Travel Planner Video');
    expect(iframe).toBeInTheDocument();
  });
});
