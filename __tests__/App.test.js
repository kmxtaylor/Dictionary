import {render, waitFor } from '@testing-library/react-native';
import App from '/';

jest.setTimeout(10000);
const TIMEOUT = { timeout: 10000 };

describe('app test suite', () => {
    // test if app renders correctly without crashing
    test('should render the app correctly', async () => {
        const { getByTestId } = render(<App />)
        await waitFor(() => {
            const app = getByTestId('app');
            expect(app).toBeDefined();
        }, TIMEOUT);
    });
});