import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InformationPanel from '../Pages/UserPanel/InformationPanel';

describe('InformationPanel', () => {
  const mockHandleSubmit = jest.fn();
  const mockHandleUserDataChange = jest.fn();

  const userData = {
    userNick: 'TestNick',
    email: 'test@test.com'
  };

  beforeEach(() => {
    render(<InformationPanel handleSubmit={mockHandleSubmit} userData={userData} handleUserDataChange={mockHandleUserDataChange} />);
  });

  it('should render without crashing', () => {
    expect(screen.getByText('Informacje')).toBeInTheDocument();
    expect(screen.getByText('sprawdz informacje które Ciebie interesują')).toBeInTheDocument();
    expect(screen.getByText('Nickname :')).toBeInTheDocument();
    expect(screen.getByText('Email :')).toBeInTheDocument();
    expect(screen.getByText('Aktualizuj')).toBeInTheDocument();
  });

  it('should display correct user data', () => {
    expect(screen.getByDisplayValue('TestNick')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@test.com')).toBeInTheDocument();
  });

  it('should handle user data change', () => {
    fireEvent.change(screen.getByDisplayValue('TestNick'), { target: { value: 'NewNick' } });
    expect(mockHandleUserDataChange).toHaveBeenCalled();

    fireEvent.change(screen.getByDisplayValue('test@test.com'), { target: { value: 'new@test.com' } });
    expect(mockHandleUserDataChange).toHaveBeenCalled();
  });

  it('should handle form submission', () => {
    fireEvent.submit(screen.getByText('Aktualizuj').closest('form')!);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
