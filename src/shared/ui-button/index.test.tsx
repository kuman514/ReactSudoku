import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { UIButton } from '.';

describe('UIButton', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should have a snapshot match for default', () => {
    const { container } = render(<UIButton>This is a button.</UIButton>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have a snapshot match for contained', () => {
    const { container } = render(
      <UIButton variant="contained">This is a contained button.</UIButton>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should be clickable', async () => {
    const mockFn = vi.fn();
    render(
      <UIButton ariaLabel="test-button" onClick={mockFn}>
        Click Test
      </UIButton>
    );
    fireEvent.click(await screen.findByLabelText('test-button'));
    expect(mockFn).toBeCalledTimes(1);
  });

  it('should be not clickable when it is disabled', async () => {
    const mockFn = vi.fn();
    render(
      <UIButton ariaLabel="test-button" onClick={mockFn} isDisabled>
        Click Test
      </UIButton>
    );
    fireEvent.click(await screen.findByLabelText('test-button'));
    expect(mockFn).toBeCalledTimes(0);
  });

  it('should has customizable style', () => {
    const { container } = render(
      <UIButton
        customStyle={{
          padding: '12px',
          color: '#20cc20',
        }}
      >
        This is a button.
      </UIButton>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
