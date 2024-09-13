import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser } from "@/store/userSlice";
import { setToken } from "@/store/tokenSlice";

const LinkedInLoginButton: React.FC = () => {
  const [us, setUs] = useState<{ name: string; email: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const LINKEDIN_USER_PROFILE_URL = 'https://api.hyperly.ai/user/me';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goToHome = () => {
    navigate('/');
  };

  useEffect(() => {
    chrome.runtime.sendMessage({ action: 'getUserProfile' }, (response) => {
      if (response) {
        console.log("User profile received", response);
        setUs(response);
      }
    });
  }, []);

  async function fetchUserProfile(token: string) {
    console.log("fetching", token);
    try {
      const response = await axios.get(LINKEDIN_USER_PROFILE_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("response", response.data);
      setUs(response.data);
      dispatch(setUser(response.data));
      localStorage.setItem('token', token);
      localStorage.setItem("me", response.data.linkedin_accounts[0].linkedin_username);
      dispatch(setToken(token));
      goToHome();
    } catch (error) {
      console.log('Error fetching user profile:', error);
      setError('Error fetching user profile');
    }
  }

  const login = async () => {
    console.log('Sending authentication request...');
    setIsLoading(true);
    setError(null);
    if (chrome && chrome.runtime) {
      try {
        const response = await chrome.runtime.sendMessage({ action: 'authenticate' });
        await chrome.storage.local.set({ "token": response.token });
        if (response.token) {
          await fetchUserProfile(response.token);
        }
        else {
          setError('No token received');
        }
      }
      catch (err) {
        setError('Authentication failed. Please try again.');
        console.error(err);
      }
      finally {
        setIsLoading(false);
      }
    }
    else {
      setError('Chrome runtime API not available');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-[450px] bg-white">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {us ? (
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Welcome, {us.name}!</h2>
          <p className="text-gray-600">Email: {us.email}</p>
        </div>
      ) : (
        <button
          onClick={login}
          disabled={isLoading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
            </svg>
          )}
          {isLoading ? 'Logging in...' : 'Login with LinkedIn'}
        </button>
      )}
    </div>
  );
};

export default LinkedInLoginButton;
