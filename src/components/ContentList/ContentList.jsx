import { useApp } from '../../context/AppContext';
import { ContentCard } from '../ContentCard/ContentCard';
import { PasteInput } from '../PasteInput/PasteInput';
import { EmptyState } from '../EmptyState/EmptyState';
import styles from './ContentList.module.css';

export function ContentList() {
  const { filteredItems, categories, selectedCategory } = useApp();

  const currentCategory = categories.find(c => c.id === selectedCategory);
  const categoryName = currentCategory?.name || '全部';
  const categoryIcon = currentCategory?.icon || '📚';

  return (
    <main className={styles.contentList}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {categoryIcon} {categoryName}
          <span className={styles.count}>({filteredItems.length})</span>
        </h2>
      </div>

      <PasteInput />

      {filteredItems.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={styles.list}>
          {filteredItems.map((item, index) => (
            <ContentCard key={item.id} item={item} index={index} />
          ))}
        </div>
      )}
    </main>
  );
}
