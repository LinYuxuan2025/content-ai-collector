import { Clipboard } from 'lucide-react';
import styles from './EmptyState.module.css';

export function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.illustration}>
        <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Book stack illustration */}
          <rect x="40" y="100" width="100" height="12" rx="2" fill="#E5E0D5" />
          <rect x="35" y="88" width="100" height="12" rx="2" fill="#EDE8DD" />
          <rect x="45" y="76" width="100" height="12" rx="2" fill="#F5F1EA" />
          {/* Feather pen */}
          <path d="M130 50 L140 70 L135 72 L125 52 Z" fill="#C4A77D" />
          <path d="M125 52 L128 58 L122 54 Z" fill="#B8860B" />
          <line x1="128" y1="58" x2="140" y2="75" stroke="#C4A77D" strokeWidth="1.5" />
          {/* Sparkles */}
          <circle cx="50" cy="45" r="3" fill="#C4A77D" opacity="0.5" />
          <circle cx="70" cy="35" r="2" fill="#8B9A7D" opacity="0.5" />
          <circle cx="85" cy="50" r="2.5" fill="#C4A77D" opacity="0.4" />
        </svg>
      </div>
      <h3 className={styles.title}>还没有收藏内容</h3>
      <p className={styles.description}>
        粘贴你喜欢的内容，AI 会自动整理分类，让你的知识收藏井然有序。
      </p>
      <div className={styles.hint}>
        <Clipboard size={18} className={styles.hintIcon} />
        <span>复制网页内容后，在上方粘贴即可</span>
      </div>
    </div>
  );
}
