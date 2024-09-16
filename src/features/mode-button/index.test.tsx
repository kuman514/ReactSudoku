import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ModeButton } from '.';

describe('ModeButton', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should be colored when it is active', () => {
    const { container } = render(
      <ModeButton modeLabel="test" isActive>
        Koishi
      </ModeButton>
    );
    const isFirstChildHtmlElement = container.firstChild instanceof HTMLElement;
    expect(isFirstChildHtmlElement).toStrictEqual(true);
    if (isFirstChildHtmlElement) {
      expect(container.firstChild.classList).toContain('MuiButton-contained');
    }
  });

  it('should be clear when it is inactive', () => {
    const { container } = render(
      <ModeButton modeLabel="test">Koishi</ModeButton>
    );
    const isFirstChildHtmlElement = container.firstChild instanceof HTMLElement;
    expect(isFirstChildHtmlElement).toStrictEqual(true);
    if (isFirstChildHtmlElement) {
      expect(container.firstChild.classList).toContain('MuiButton-outlined');
    }
  });

  it('should call on-click function', async () => {
    const mockFn = vi.fn();
    render(
      <ModeButton modeLabel="test" onClick={mockFn}>
        Koishi
      </ModeButton>
    );
    fireEvent.click(await screen.findByLabelText('mode-button-test'));
    expect(mockFn).toHaveBeenCalled();
  });

  it('should not call on-click function when it is disabled', async () => {
    const mockFn = vi.fn();
    render(
      <ModeButton modeLabel="test" onClick={mockFn} isDisabled>
        Koishi
      </ModeButton>
    );
    fireEvent.click(await screen.findByLabelText('mode-button-test'));
    expect(mockFn).not.toHaveBeenCalled();
  });
});
