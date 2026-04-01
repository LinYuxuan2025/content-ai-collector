import { Search, Settings, Library } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import styles from './Header.module.css';

export function Header() {
  const { searchQuery, dispatch } = useApp();

  const handleSearchChange = (e) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
  };

  const openSettings = () => {
    dispatch({ type: 'SET_SETTINGS_OPEN', payload: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>📚</span>
        <span>知识收藏夹</span>
      </div>

      <div className={styles.searchWrapper}>
        <div className={styles.searchContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="搜索标题、内容、标签..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.iconButton} onClick={openSettings} aria-label="设置">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}
