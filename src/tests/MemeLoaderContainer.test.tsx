import { render } from '@testing-library/react';
import { LanguageProvider } from '../context/LanguageProvider';
import { AuthProvider } from '../context/AuthProvider';
import { SubscriptionProvider } from '../context/SubscriptionProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import MemeLoaderContainer from '../Pages/Home/BrowsingMemes/MemeLoaderContainer';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

jest.mock('moment', () => () => jest.requireActual('moment')('2020-01-01T00:00:00.000Z'));

describe('MemeLoaderContainer', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <QueryClientProvider client={queryClient}>
                <MemeLoaderContainer />
              </QueryClientProvider>
            </SubscriptionProvider>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    );
  });
});
