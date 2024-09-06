import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import Logo2 from './icons/logo2';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import { fetchLinkedInProfileUpdates } from './services/post';
import LinkedInLoginButton from './pages/Login';
import PublicRoute from './components/auth/publicRoute';
import PrivateRoute from './components/auth/privateRoute';


const ContentRouter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  const toggleContent = () => {
    setIsVisible(!isVisible);
  };

  const headerStyle = {
    right: isVisible ? 0 : '-450px',
  };


  useEffect(() => {
    const checkIfLinkedInUserProfile = async () => {
      try {
        const currentUrl = window.location.href;
        if (currentUrl.includes('linkedin.com/in/')) {
          const urlParts = new URL(currentUrl);
          const pathname = urlParts.pathname;
          const urn = pathname.split('/').filter(Boolean).pop();
          const data = await fetchLinkedInProfileUpdates(urn);
          setProfileData(data);
        } else {
          console.warn('URL does not contain "linkedin/in".');
        }
      } catch (error) {
        console.error('Error fetching profile updates:', error);
      }
    };

    checkIfLinkedInUserProfile();
  }, []);


  return (
    <div style={headerStyle} className={`App-header transition-all color-white duration-300 fixed top-0 ${isVisible ? 'right-0' : 'right-[-450px]'}`}>
      <div className='button flex items-center' onClick={toggleContent}>
        <Logo2 />
      </div>

      {isVisible && (
        <Router>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LinkedInLoginButton />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <PrivateRoute>
                  <Analytics />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default ContentRouter;
