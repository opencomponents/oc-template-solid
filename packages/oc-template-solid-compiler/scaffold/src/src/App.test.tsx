import { describe, it, afterEach, beforeEach, expect, vi } from 'vitest';
import { render } from '@solidjs/testing-library';
import { DataProvider } from 'oc-template-solid-compiler/utils/useData';

import App from './App';

const getData = vi.fn();

describe('App - Page', () => {
  beforeEach(() => {
    window.oc = { events: { on: vi.fn(), fire: vi.fn() } } as any;
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Gets more data when clicking the button', () => {
    getData.mockImplementationOnce(() => Promise.resolve({}));
    const { getByText } = render(() => (
      <DataProvider
        value={{
          firstName: 'firstName',
          lastName: 'lastName',
          userId: 0,
          getData,
        }}
      >
        <App />
      </DataProvider>
    ));

    const extraInfoButton = getByText(/Get extra information/i);
    expect(extraInfoButton).toBeTruthy();
  });
});
