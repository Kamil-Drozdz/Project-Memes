import { render } from '@testing-library/react';
import MemeLoaderContainer from '../Pages/Home/BrowsingMemes/MemeLoaderContainer';
import { useAuth } from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import { useMemeVote } from '../hooks/useMemeVote';
import { AuthContextType } from '../context/AuthProvider';
import { LanguageProvider } from '../context/LanguageProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { atLayout } from '../components/App';
import { toast } from 'react-toastify';

jest.mock('moment/dist/locale/pl', () => jest.fn());
jest.mock('../payments/Checkout/Checkout', () => () => null);
jest.mock('../Pages/GenerateMeme/GenerateMem', () => () => null);
jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn()
}));
jest.mock('../hooks/useFetch', () => jest.fn());
jest.mock('../hooks/useMemeVote', () => ({
  useMemeVote: jest.fn()
}));
// Mocking react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe('MemeLoaderContainer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render and fetch memes correctly', async () => {
    const mockData = [
      {
        id: 5,
        isLike: true,
        category: 'Animals',
        type: 'Soft',
        isNsfw: false,
        isUncropped: false,
        dislikeCount: 1,
        likeCount: 0,
        url: 'https://static.kamildrozdz.pl/72BZnaVz4OU88SecSzPadAYfzcictXKE.jpg',
        userReaction: { id: '1' }
      }
    ];

    (useFetch as jest.Mock).mockImplementation(() => ({
      data: mockData,
      isLoading: false,
      error: null,
      refetch: jest.fn()
    }));

    (useAuth as jest.MockedFunction<typeof useAuth>).mockImplementation(
      (): AuthContextType => ({
        isLoading: false,
        auth: {
          email: null,
          password: null,
          roles: null,
          userId: null,
          lastLogin: null,
          userNick: null,
          token: null
        },
        setAuth: jest.fn()
      })
    );

    (useMemeVote as jest.MockedFunction<typeof useMemeVote>).mockImplementation(jest.fn());

    render(
      <LanguageProvider>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={atLayout(MemeLoaderContainer)} />
          </Routes>
        </MemoryRouter>
      </LanguageProvider>
    );
  });

  it('should show error message when memes failed to load', async () => {
    (useFetch as jest.Mock).mockImplementation(() => ({
      data: null,
      isLoading: false,
      error: 'Error fetching memes',
      refetch: jest.fn()
    }));

    expect(toast.error).toHaveBeenCalledWith('Nie można załadować mema', { autoClose: 2000 });

    (useMemeVote as jest.MockedFunction<typeof useMemeVote>).mockImplementation(jest.fn());
  });
});
