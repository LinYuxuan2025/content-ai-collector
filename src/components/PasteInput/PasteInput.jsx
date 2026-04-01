import { useState, useCallback } from 'react';
import { Clipboard, Loader2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useClaude } from '../../hooks/useClaude';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Button } from '../ui/Button';
import { STORAGE_KEYS } from '../../utils/constants';
import styles from './PasteInput.module.css';

export function PasteInput() {
  const [content, setContent] = useState('');
  const [apiKey] = useLocalStorage('claude-api-key', '');
  const [apiUrl] = useLocalStorage('claude-api-url', 'https://api.minimaxi.com/anthropic');
  const [model] = useLocalStorage('claude-model', 'MiniMax-M2.7');
  const { dispatch } = useApp();
  const { analyze, isLoading, error, clearError } = useClaude();

  const handlePaste = useCallback(async () => {
    if (!content.trim()) return;

    if (!apiKey) {
      alert('请先在设置中配置 API Key');
      dispatch({ type: 'SET_SETTINGS_OPEN', payload: true });
      return;
    }

    try {
      clearError();
      const result = await analyze(content, apiKey, apiUrl, model);
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          ...result,
          originalContent: content,
        },
      });
      setContent('');
    } catch (err) {
      // Error is handled by the hook
    }
  }, [content, apiKey, apiUrl, model, analyze, clearError, dispatch]);

  const handleInputPaste = async (e) => {
    // Only handle paste event if textarea is empty or has selection
    if (!content && !window.location.selection?.toString()) {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          setContent(text);
        }
      } catch (err) {
        // Clipboard access denied, user will manually paste
      }
    }
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handlePaste();
    }
  };

  return (
    <div className={styles.pasteArea}>
      <textarea
        className={styles.textarea}
        placeholder="粘贴你喜欢的内容到这里，AI 自动整理..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onPaste={handleInputPaste}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />

      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <span>AI 整理中...</span>
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className={styles.actions}>
        <span className={styles.hint}>
          按 <span className={styles.hintKbd}>⌘</span> + <span className={styles.hintKbd}>Enter</span> 快速提交
        </span>
        <div className={styles.buttonGroup}>
          <Button
            variant="secondary"
            onClick={() => setContent('')}
            disabled={!content || isLoading}
          >
            清空
          </Button>
          <Button
            variant="primary"
            onClick={handlePaste}
            disabled={!content.trim() || isLoading}
          >
            <Clipboard size={16} />
            AI 整理
          </Button>
        </div>
      </div>
    </div>
  );
}
