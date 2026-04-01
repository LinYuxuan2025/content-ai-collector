import { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_CATEGORIES, STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/helpers';

const AppContext = createContext(null);

const initialState = {
  items: [],
  categories: DEFAULT_CATEGORIES,
  selectedCategory: 'all',
  searchQuery: '',
  isSettingsOpen: false,
  isProcessing: false,
  viewMode: 'card',
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return { ...state, items: action.payload };

    case 'ADD_ITEM': {
      const newItem = {
        id: generateId(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return { ...state, items: [newItem, ...state.items] };
    }

    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload, updatedAt: new Date().toISOString() }
            : item
        ),
      };

    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };

    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [
          ...state.categories,
          {
            id: generateId(),
            ...action.payload,
            order: state.categories.length,
            isDefault: false,
          },
        ],
      };

    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(cat =>
          cat.id === action.payload.id ? { ...cat, ...action.payload } : cat
        ),
      };

    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(cat => cat.id !== action.payload),
        selectedCategory: state.selectedCategory === action.payload ? 'all' : state.selectedCategory,
      };

    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };

    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };

    case 'SET_SETTINGS_OPEN':
      return { ...state, isSettingsOpen: action.payload };

    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload };

    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [savedItems, setSavedItems] = useLocalStorage(STORAGE_KEYS.ITEMS, []);
  const [savedCategories, setSavedCategories] = useLocalStorage(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES);

  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    items: savedItems,
    categories: savedCategories,
  });

  useEffect(() => {
    setSavedItems(state.items);
  }, [state.items, setSavedItems]);

  useEffect(() => {
    setSavedCategories(state.categories);
  }, [state.categories, setSavedCategories]);

  const filteredItems = state.items.filter(item => {
    const matchesCategory = state.selectedCategory === 'all' || item.category === state.selectedCategory;
    const query = state.searchQuery.toLowerCase();
    const matchesSearch = !query ||
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.originalContent.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const value = {
    ...state,
    filteredItems,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
