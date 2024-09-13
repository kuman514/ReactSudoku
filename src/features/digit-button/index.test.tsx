import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DigitButton } from '.';

describe('DigitButton', () => {
  beforeEach(() => {
    cleanup();
  });

  it('should be colored when it is active', () => {
    const { container } = render(<DigitButton digit={5} isActive />);
    const isFirstChildHtmlElement = container.firstChild instanceof HTMLElement;
    expect(isFirstChildHtmlElement).toStrictEqual(true);
    if (isFirstChildHtmlElement) {
      expect(container.firstChild.classList).toContain('MuiButton-contained');
    }
  });

  it('should be clear when it is inactive', () => {
    const { container } = render(<DigitButton digit={1} />);
    const isFirstChildHtmlElement = container.firstChild instanceof HTMLElement;
    expect(isFirstChildHtmlElement).toStrictEqual(true);
    if (isFirstChildHtmlElement) {
      expect(container.firstChild.classList).toContain('MuiButton-outlined');
    }
  });

  it('should call on-click function with its own digit as a parameter', async () => {
    const mockFn = vi.fn();
    render(<DigitButton digit={4} onClick={mockFn} />);
    fireEvent.click(await screen.findByLabelText('digit-button-4'));
    expect(mockFn).toHaveBeenCalledWith(4);
  });

  it('should not call on-click function when it is disabled', async () => {
    const mockFn = vi.fn();
    render(<DigitButton digit={5} onClick={mockFn} isDisabled />);
    fireEvent.click(await screen.findByLabelText('digit-button-5'));
    expect(mockFn).not.toHaveBeenCalled();
  });
});
