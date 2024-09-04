import React, { useState } from 'react';
import {MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import Logo2 from './icons/logo2';
import Home from './pages/Home';
import Analytics from './pages/Analytics';

const ContentRouter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleContent = () => {
    console.log("entry")
    setIsVisible(!isVisible);
  };


  const headerStyle = {
    right: isVisible ? 0 : '-450px',
  };

  return (
    <div  style={ headerStyle} className={`App-header transition-all color-white duration-300 fixed top-0 ${isVisible ? 'right-0' : 'right-[-450px]'}`}>
       <div className='button flex items-center' onClick={toggleContent}>
          <Logo2 />
       </div>

      {isVisible && (
        <Router>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
        </Router>
      )}
    </div>
  );
};



export default ContentRouter;
