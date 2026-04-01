import { useState, useRef, useEffect } from 'react';
import { Palette, Upload } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import styles from './BackgroundSelector.module.css';

const BACKGROUNDS = [
  { id: 'bg-floral-1', name: '金色花簇' },
  { id: 'bg-ivory-gold', name: '象牙金叶' },
  { id: 'bg-parchment', name: '羊皮纸桂冠' },
  { id: 'bg-rose-gold', name: '玫瑰金' },
  { id: 'bg-lavender', name: '薰衣草紫' },
  { id: 'bg-cream', name: '经典奶油' },
  { id: 'bg-sepia', name: '暖棕色调' },
];

export function BackgroundSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentBg, setCurrentBg] = useLocalStorage('app-background', 'bg-floral-1');
  const [customBg, setCustomBg] = useLocalStorage('app-custom-bg', '');
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.className = customBg ? 'bg-custom' : currentBg;
    if (customBg) {
      document.body.style.backgroundImage = `url(${customBg})`;
    } else {
      document.body.style.backgroundImage = '';
    }
  }, [currentBg, customBg]);

  const handleBgSelect = (bgId) => {
    setCurrentBg(bgId);
    setCustomBg('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setCustomBg(event.target.result);
      setCurrentBg('');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCustom = () => {
    setCustomBg('');
    setCurrentBg('bg-floral-1');
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        className={`${styles.toggleButton} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="切换背景"
      >
        <Palette size={20} />
      </button>

      {isOpen && (
        <div className={styles.panel}>
          <h4 className={styles.panelTitle}>选择背景图案</h4>

          <div className={styles.bgGrid}>
            {BACKGROUNDS.map((bg) => (
              <div
                key={bg.id}
                className={`${styles.bgOption} ${currentBg === bg.id && !customBg ? styles.active : ''}`}
                onClick={() => handleBgSelect(bg.id)}
              >
                <div
                  className={bg.id}
                  style={{ width: '100%', height: '100%', borderRadius: '6px' }}
                />
                <span>{bg.name}</span>
              </div>
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.uploadSection}>
            {customBg && (
              <>
                <img src={customBg} alt="自定义背景" className={styles.customPreview} />
                <button className={styles.removeCustom} onClick={handleRemoveCustom}>
                  移除自定义背景
                </button>
              </>
            )}
            {!customBg && (
              <label className={styles.uploadLabel}>
                <Upload size={24} className={styles.uploadIcon} />
                <span>上传自定义背景</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className={styles.uploadInput}
                />
              </label>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
