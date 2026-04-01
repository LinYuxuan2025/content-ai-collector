export const DEFAULT_CATEGORIES = [
  { id: 'all', name: '全部', icon: '📚', order: 0, isDefault: true },
  { id: 'philosophy', name: '人生哲理', icon: '💭', order: 1, isDefault: true },
  { id: 'fitness', name: '健身知识', icon: '💪', order: 2, isDefault: true },
  { id: 'interview', name: '面试题库', icon: '📋', order: 3, isDefault: true },
  { id: 'learning', name: '学习方法', icon: '📚', order: 4, isDefault: true },
  { id: 'work', name: '工作技巧', icon: '💼', order: 5, isDefault: true },
  { id: 'reading', name: '读书笔记', icon: '📖', order: 6, isDefault: true },
  { id: 'research', name: '待研究', icon: '🔍', order: 7, isDefault: true },
];

export const STORAGE_KEYS = {
  ITEMS: 'knowledge-collector:items',
  CATEGORIES: 'knowledge-collector:categories',
  SETTINGS: 'knowledge-collector:settings',
};

export const MAX_CONTENT_LENGTH = 5000;
