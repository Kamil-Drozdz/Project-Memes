import { act, render } from '@testing-library/react';
import MemeLoaderContainer from '../Pages/Home/BrowsingMemes/MemeLoaderContainer';
import useFetch from '../hooks/useFetch';
import { useMemeVote } from '../hooks/useMemeVote';
import { Provider } from 'react-redux';
import store from '../store/store';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { atLayout } from '../components/App';
import { toast } from 'react-toastify';

jest.mock('moment/dist/locale/pl', () => jest.fn());
jest.mock('../payments/Checkout/Checkout', () => () => null);
jest.mock('../Pages/GenerateMeme/GenerateMem', () => () => null);

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

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation((selector) => {
    const mockState = selector({
      auth: {
        email: 'test@example.com',
        userNick: 'testUser'
      }
    });

    return mockState;
  }),
  useDispatch: () => jest.fn()
}));

describe('MemeLoaderContainer', () => {
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

  (useMemeVote as jest.MockedFunction<typeof useMemeVote>).mockImplementation(jest.fn());

  render(
    <Provider store={store}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={atLayout(MemeLoaderContainer)} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
});

it('should show error message when memes failed to load', async () => {
  (useFetch as jest.Mock).mockImplementation(() => ({
    data: null,
    isLoading: false,
    error: 'Error fetching memes',
    refetch: jest.fn()
  }));

  await act(async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={atLayout(MemeLoaderContainer)} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  expect(toast.error).toHaveBeenCalledWith('Nie można załadować mema', { autoClose: 2000 });

  (useMemeVote as jest.MockedFunction<typeof useMemeVote>).mockImplementation(jest.fn());
});
