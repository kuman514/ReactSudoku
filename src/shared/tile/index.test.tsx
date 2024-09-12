import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Tile } from '.';

describe('Tile', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should have a snapshot match for a colored tile', () => {
    const { container } = render(
      <Tile isColored>This is a colored tile.</Tile>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have a snapshot match for a clear tile', () => {
    const { container } = render(<Tile>This is an clear tile.</Tile>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should be clickable', async () => {
    const mockFn = vi.fn();
    render(
      <Tile ariaLabel="test-tile" onClick={mockFn}>
        Click Test
      </Tile>
    );
    fireEvent.click(await screen.findByLabelText('test-tile'));
    expect(mockFn).toBeCalledTimes(1);
  });

  it('should be not clickable when it is disabled', async () => {
    const mockFn = vi.fn();
    render(
      <Tile ariaLabel="test-tile" onClick={mockFn} isDisabled>
        Click Test
      </Tile>
    );
    fireEvent.click(await screen.findByLabelText('test-tile'));
    expect(mockFn).toBeCalledTimes(0);
  });
});
