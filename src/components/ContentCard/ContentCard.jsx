import { useState } from 'react';
import { ChevronDown, ChevronUp, Copy, Trash2, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../utils/helpers';
import styles from './ContentCard.module.css';

export function ContentCard({ item, index = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { dispatch } = useApp();

  const handleCopy = () => {
    navigator.clipboard.writeText(item.originalContent);
  };

  const handleDelete = () => {
    if (window.confirm('确定要删除这条收藏吗？')) {
      dispatch({ type: 'DELETE_ITEM', payload: item.id });
    }
  };

  return (
    <article className={styles.card} style={{ '--index': index }}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.meta}>
            {item.source && (
              <span className={styles.source}>
                <Globe size={12} />
                {item.source}
              </span>
            )}
            <span className={styles.date}>{formatDate(item.createdAt)}</span>
            <span className={styles.categoryBadge}>
              {item.category}
            </span>
          </div>
        </div>
      </div>

      <p className={styles.summary}>{item.summary}</p>

      {item.highlights && item.highlights.length > 0 && (
        <div className={styles.highlights}>
          <h4 className={styles.highlightsTitle}>关键点</h4>
          <div className={styles.highlightsList}>
            {item.highlights.map((highlight, i) => (
              <span key={i} className={styles.highlightItem}>
                {highlight}
              </span>
            ))}
          </div>
        </div>
      )}

      {item.tags && item.tags.length > 0 && (
        <div className={styles.tags}>
          {item.tags.map((tag, i) => (
            <span key={i} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      <button
        className={styles.expandButton}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>
            <ChevronUp size={14} />
            收起原文
          </>
        ) : (
          <>
            <ChevronDown size={14} />
            查看原文
          </>
        )}
      </button>

      {isExpanded && (
        <div className={styles.originalContent}>
          <div className={styles.originalContentText}>
            {item.originalContent}
          </div>
        </div>
      )}

      <div className={styles.actions}>
        <button className={styles.actionButton} onClick={handleCopy}>
          <Copy size={14} />
          复制原文
        </button>
        <button className={`${styles.actionButton} ${styles.danger}`} onClick={handleDelete}>
          <Trash2 size={14} />
          删除
        </button>
      </div>
    </article>
  );
}
