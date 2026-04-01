import { AppProvider } from './context/AppContext';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { ContentList } from './components/ContentList/ContentList';
import { SettingsModal } from './components/SettingsModal/SettingsModal';
import { BackgroundSelector } from './components/BackgroundSelector/BackgroundSelector';
import './styles/global.css';

function App() {
  return (
    <AppProvider>
      <Header />
      <Sidebar />
      <ContentList />
      <SettingsModal />
      <BackgroundSelector />
    </AppProvider>
  );
}

export default App;
