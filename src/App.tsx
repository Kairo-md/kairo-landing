import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/ui/Preloader';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { InteractiveDemo } from './components/InteractiveDemo';
import { Features } from './components/Features';
import { DownloadSection } from './components/DownloadSection';
import { Footer } from './components/Footer';
import { DocsPage } from './pages/DocsPage';
import type { DocTabId } from './pages/DocsPage';

type PageRoute = 'home' | 'about' | 'privacy';
type ThemeMode = 'dark' | 'light';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [initialDocTab, setInitialDocTab] = useState<DocTabId>('getting-started');

  const currentPageRef = useRef<PageRoute>(currentPage);
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('kairo-theme') as ThemeMode;
    return saved || 'dark';
  });

  const [accentColor, setAccentColor] = useState<string>(() => {
    const saved = localStorage.getItem('kairo-accent');
    return saved || '#5E6F52';
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('kairo-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accentColor);
    localStorage.setItem('kairo-accent', accentColor);
  }, [accentColor]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
      const prevPage = currentPageRef.current;

      if (path.startsWith('/docs') || path === '/privacy') {
        let targetTab: DocTabId = 'getting-started';
        if (path === '/docs/how-it-works') targetTab = 'how-it-works';
        else if (path === '/docs/features') targetTab = 'features';
        else if (path === '/docs/account-billing') targetTab = 'account-billing';
        else if (path === '/docs/faq') targetTab = 'faq';
        else if (path === '/docs/privacy' || path === '/privacy') targetTab = 'privacy';

        if (path === '/privacy') {
          window.history.replaceState({}, '', '/docs/privacy');
        }

        if (prevPage !== 'about' && prevPage !== 'privacy') {
          setIsLoading(true);
        }
        setCurrentPage('about');
        setInitialDocTab(targetTab);
      } else {
        if (prevPage === 'about' || prevPage === 'privacy') {
          setIsLoading(true);
        }
        setCurrentPage('home');
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  const navigatePage = (page: PageRoute) => {
    const prevPage = currentPageRef.current;

    if (page === 'home') {
      if (prevPage === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setIsLoading(true);
        setCurrentPage('home');
        window.history.pushState({}, '', '/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (page === 'about') {
      if (prevPage !== 'about' && prevPage !== 'privacy') {
        setIsLoading(true);
      }
      setCurrentPage('about');
      setInitialDocTab('getting-started');
      window.history.pushState({}, '', '/docs/getting-started');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'privacy') {
      if (prevPage !== 'about' && prevPage !== 'privacy') {
        setIsLoading(true);
      }
      setCurrentPage('about');
      setInitialDocTab('privacy');
      window.history.pushState({}, '', '/docs/privacy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  };

  const scrollToSection = (id: string) => {
    const prevPage = currentPageRef.current;

    if (prevPage !== 'home') {
      setIsLoading(true);
      setCurrentPage('home');
      window.history.pushState({}, '', '/');
      setTimeout(() => {
        if (id === 'top' || id === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(id);
          if (element) {
            const yOffset = -70; // Compensate for fixed top header height
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
      }, 50);
      return;
    }

    if (id === 'top' || id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70; // Compensate for fixed top header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      {isLoading && (
        <Preloader
          theme={theme}
          durationMs={2500}
          onFinish={() => setIsLoading(false)}
        />
      )}

      {currentPage === 'about' || currentPage === 'privacy' ? (
        <DocsPage
          theme={theme}
          initialTab={initialDocTab}
          onToggleTheme={toggleTheme}
          onNavigateHome={() => navigatePage('home')}
          onNavigatePage={navigatePage}
          onScrollToSection={scrollToSection}
        />
      ) : (
        <div className={`min-h-screen bg-(--bg) text-(--text-primary) flex flex-col font-sans selection:bg-blue-600/30 selection:text-white ${theme}`}>
          {/* Navigation Bar */}
          <Navbar
            theme={theme}
            onToggleTheme={toggleTheme}
            onNavigatePage={navigatePage}
            onScrollToSection={scrollToSection}
          />

          {/* Main Content */}
          <main className="flex-1">
            {/* Hero Section */}
            <Hero
              theme={theme}
              onScrollToDownload={() => scrollToSection('download')}
              onScrollToDemo={() => scrollToSection('demo')}
              accentColor={accentColor}
              onSelectAccentColor={setAccentColor}
            />

            {/* Stats & Download Metrics Section */}
            <Stats />

            {/* Interactive Live Demo */}
            <InteractiveDemo theme={theme} accentColor={accentColor} />

            {/* Core Features */}
            <Features />

            {/* Download Section */}
            <DownloadSection />
          </main>

          {/* Footer */}
          <Footer
            theme={theme}
            onNavigatePage={navigatePage}
            onScrollToSection={scrollToSection}
          />
        </div>
      )}
    </>
  );
}
