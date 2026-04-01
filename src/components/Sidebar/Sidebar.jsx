import { Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const { categories, items, selectedCategory, dispatch } = useApp();

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return items.length;
    return items.filter(item => item.category === categories.find(c => c.id === categoryId)?.name).length;
  };

  const handleCategoryClick = (categoryId) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: categoryId });
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>分类</h3>
        <ul className={styles.categoryList}>
          {categories.map((category) => (
            <li
              key={category.id}
              className={`${styles.categoryItem} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span className={styles.categoryName}>{category.name}</span>
              <span className={styles.categoryCount}>{getCategoryCount(category.id)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <button className={styles.addButton}>
          <Plus size={16} className={styles.addIcon} />
          <span>添加分类</span>
        </button>
      </div>
    </aside>
  );
}
