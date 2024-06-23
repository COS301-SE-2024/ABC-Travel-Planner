import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Help from '../app/help/page'; 

describe('Help Component', () => {
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

    expect(screen.getByText('abctravel@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('0814562345')).toBeInTheDocument();
    expect(screen.getByText('0713452668')).toBeInTheDocument();
  });

  it('renders the video section', () => {
    render(<Help />);
    const videoHeading = screen.getByRole('heading', { name: /Need more information\? Watch Me!/i });
    expect(videoHeading).toBeInTheDocument();
    
    const iframe = screen.getByTitle('ABC Travel Planner Video');
    expect(iframe).toBeInTheDocument();
  });
});
