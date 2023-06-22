import { render, screen, fireEvent } from '@testing-library/react';
import { toast } from 'react-toastify';
import MemeInteractionContainer from '../Pages/MemeInteraction/MemeInteractionContainer';
import { LanguageProvider } from '../context/LanguageProvider';
import { MemoryRouter, Route } from 'react-router-dom';
import { atLayout } from '../components/App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '../context/AuthProvider';

const queryClient = new QueryClient();

jest.mock('moment/dist/locale/pl', () => jest.fn());
jest.mock('../payments/Checkout/Checkout', () => () => null);
jest.mock('../Pages/GenerateMeme/GenerateMem', () => () => null);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '5' })
}));

// Mocking react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe('MemeInteractionContainer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render loading state', () => {
    render(
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <MemoryRouter initialEntries={['/memes/5']}>
              <Route path="/meme/:id" element={atLayout(MemeInteractionContainer)} />
            </MemoryRouter>
          </LanguageProvider>
        </QueryClientProvider>
      </AuthProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should handle successful meme fetch', () => {
    const fetchedMeme = {
      likeCount: 1,
      dislikeCount: 0,
      id: 5,
      url: 'https://static.kamildrozdz.pl/72BZnaVz4OU88SecSzPadAYfzcictXKE.jpg',
      userReaction: {
        id: 'like'
      }
    };

    // Mockowanie odpowiedzi z useFetch
    jest.mock('../hooks/useFetch', () => () => ({
      data: fetchedMeme,
      isLoading: false
    }));

    render(
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <MemeInteractionContainer texts={{}} />
          </LanguageProvider>
        </QueryClientProvider>
      </AuthProvider>
    );

    expect(screen.getByAltText('random meme')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByTestId('like-button')).toHaveTextContent('FilledLikeIcon');
  });

  it('should handle meme not found', () => {
    // Mockowanie odpowiedzi z useFetch
    jest.mock('../hooks/useFetch', () => () => ({
      data: null,
      isLoading: false
    }));

    render(
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <MemeInteractionContainer texts={{}} />
          </LanguageProvider>
        </QueryClientProvider>
      </AuthProvider>
    );

    expect(screen.getByText('Meme not found')).toBeInTheDocument();
  });

  it('should handle copy button click', async () => {
    render(
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <MemeInteractionContainer texts={{ linkCopied: 'Link copied', linkCopiedError: 'Error copying link' }} />
          </LanguageProvider>
        </QueryClientProvider>
      </AuthProvider>
    );

    const writeTextMock = jest.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });

    fireEvent.click(screen.getByTestId('copy-button'));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(writeTextMock).toHaveBeenCalledWith(window.location.href);
    expect(toast.success).toHaveBeenCalledWith('Link copied', { autoClose: 1000 });
  });

  it('should handle error while copying link', async () => {
    render(
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <MemeInteractionContainer texts={{ linkCopied: 'Link copied', linkCopiedError: 'Error copying link' }} />
          </LanguageProvider>
        </QueryClientProvider>
      </AuthProvider>
    );

    const writeTextMock = jest.fn().mockRejectedValueOnce(new Error('Clipboard writeText error'));
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock
      }
    });

    fireEvent.click(screen.getByTestId('copy-button'));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(writeTextMock).toHaveBeenCalledWith(window.location.href);
    expect(toast.error).toHaveBeenCalledWith('Error copying link', { autoClose: 1000 });
  });

  it('should handle failed meme fetch', () => {
    jest.mock('../hooks/useFetch', () => () => ({
      data: null,
      isLoading: false
    }));

    render(
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <LanguageProvider>
            <MemeInteractionContainer texts={{}} />
          </LanguageProvider>
        </QueryClientProvider>
      </AuthProvider>
    );

    expect(toast.error).toHaveBeenCalledWith('Nie można załadować mema', { autoClose: 2000 });
  });
});
