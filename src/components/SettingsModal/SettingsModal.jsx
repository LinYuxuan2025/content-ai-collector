import { useState, useRef } from 'react';
import { Eye, EyeOff, Download, Upload, AlertTriangle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useApp } from '../../context/AppContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../../utils/constants';
import styles from './SettingsModal.module.css';

export function SettingsModal() {
  const { isSettingsOpen, dispatch, items } = useApp();
  const [apiKey, setApiKey] = useLocalStorage('claude-api-key', '');
  const [apiUrl, setApiUrl] = useLocalStorage('claude-api-url', 'https://api.minimaxi.com/anthropic');
  const [model, setModel] = useLocalStorage('claude-model', 'MiniMax-M2.7');
  const [showApiKey, setShowApiKey] = useState(false);
  const fileInputRef = useRef(null);

  const handleClose = () => {
    dispatch({ type: 'SET_SETTINGS_OPEN', payload: false });
  };

  const handleExport = () => {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      items: items,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `knowledge-collector-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.items && Array.isArray(data.items)) {
          if (window.confirm(`确定要导入 ${data.items.length} 条收藏吗？现有的收藏不会被覆盖。`)) {
            data.items.forEach(item => {
              dispatch({ type: 'ADD_ITEM', payload: item });
            });
            alert('导入成功！');
          }
        } else {
          alert('文件格式不正确');
        }
      } catch (err) {
        alert('文件解析失败');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleClearAll = () => {
    if (window.confirm('确定要清空所有收藏吗？此操作不可恢复！')) {
      if (window.confirm('再次确认：所有收藏将被永久删除！')) {
        dispatch({ type: 'SET_ITEMS', payload: [] });
        handleClose();
      }
    }
  };

  return (
    <Modal isOpen={isSettingsOpen} onClose={handleClose} title="设置">
      <div className={styles.settingsSection}>
        <h3 className={styles.sectionTitle}>AI 配置</h3>

        <div className={styles.inputGroup}>
          <label className={styles.label}>API 地址</label>
          <input
            type="text"
            className={styles.input}
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="https://api.minimaxi.com/anthropic"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>模型名称</label>
          <input
            type="text"
            className={styles.input}
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="MiniMax-M2.7"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>API Key</label>
          <input
            type={showApiKey ? 'text' : 'password'}
            className={styles.input}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="输入你的 API Key"
          />
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowApiKey(!showApiKey)}
          >
            {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <p className={styles.helpText}>
          使用 MiniMax 作为 AI 后端，通过 ccswitch 兼容 Claude API 格式。
        </p>
      </div>

      <div className={styles.settingsSection}>
        <h3 className={styles.sectionTitle}>数据管理</h3>
        <div className={styles.buttonGroup}>
          <button className={`${styles.button} ${styles.exportButton}`} onClick={handleExport}>
            <Download size={16} />
            导出数据
          </button>
          <button className={`${styles.button} ${styles.importButton}`} onClick={handleImportClick}>
            <Upload size={16} />
            导入数据
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className={styles.hiddenInput}
          />
        </div>
        <p className={styles.helpText} style={{ marginTop: 'var(--space-md)' }}>
          当前共有 {items.length} 条收藏
        </p>
      </div>

      <div className={styles.dangerSection}>
        <button className={styles.dangerButton} onClick={handleClearAll}>
          <AlertTriangle size={16} />
          清空所有收藏
        </button>
      </div>
    </Modal>
  );
}
