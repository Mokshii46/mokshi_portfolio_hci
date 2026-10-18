import { useEffect } from 'react';

/**
 * HCI Principle: Flexibility and Efficiency of Use (Nielsen #7) & User Control (Nielsen #3)
 * Provides keyboard accelerators for power users, evaluators, and screen reader / keyboard-only users.
 */
export function useKeyboardShortcuts({
  onOpenCommandPalette,
  onOpenHciGuide,
  onToggleTheme,
  onEscape,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isInput = activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.isContentEditable;

      // Escape key: Universal emergency exit
      if (e.key === 'Escape') {
        if (onEscape) onEscape();
        return;
      }

      // Command Palette: Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (onOpenCommandPalette) onOpenCommandPalette();
        return;
      }

      // If user is actively typing in a form field, do not trigger single-key hotkeys
      if (isInput) return;

      // '?' key: Open HCI Documentation / Navigation Help
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        if (onOpenHciGuide) onOpenHciGuide();
        return;
      }

      // 'd' or 'D': Quick Toggle Theme
      if (e.key.toLowerCase() === 'd' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        if (onToggleTheme) onToggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenCommandPalette, onOpenHciGuide, onToggleTheme, onEscape]);
}
