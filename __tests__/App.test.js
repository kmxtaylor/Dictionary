import {render, waitFor } from '@testing-library/react-native';
import App from '../App';
import Home from 'screens/Home';

jest.setTimeout(10000);
const TIMEOUT = { timeout: 10000 };

describe('app test suite', () => {

// test if the app renders correctly without crashing
test('should render the app correctly', async () => {
    const { getByTestId } = render(<Home />)
    await waitFor(() => {
        const app = getByTestId('home-screen');
        expect(app).not.toBeNull();
    }, TIMEOUT);
});

});