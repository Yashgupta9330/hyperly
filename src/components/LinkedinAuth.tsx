import { useEffect, useState } from 'react';

const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization';
const CLIENT_ID = '86id7o3frfeuam';
const REDIRECT_URI = 'https://api.hyperly.ai/linkedin/extension/auth';
const SCOPES = ['openid', 'profile', 'email', 'w_member_social', 'r_basicprofile', 'r_organization_social', 'rw_organization_admin', 'w_organization_social'];

const useLinkedInAuth = () => {
  const [token, setToken] = useState<string | null>(null);

  const authenticate = () => {
    const authUrl = `${LINKEDIN_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES.join(' '))}`;

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl,
        interactive: true
      },
      (redirectUrl) => {
        if (chrome.runtime.lastError || !redirectUrl) {
          console.error('LinkedIn auth error:', chrome.runtime.lastError);
          return;
        }
        
        // Extract the authorization code from the redirect URL
        const url = new URL(redirectUrl);
        const code = url.searchParams.get('code');
        
        if (code) {
          // Send the code to your backend to exchange for a token
          exchangeCodeForToken(code);
        } else {
          console.error('No authorization code found in the redirect URL');
        }
      }
    );
  };

  const exchangeCodeForToken = async (code: string) => {
    try {
      const response = await fetch('https://api.hyperly.ai/linkedin/exchange-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Token exchange failed');
      }

      const data = await response.json();
      setToken(data.access_token);
      
      // Store the token
      chrome.storage.local.set({ linkedInToken: data.access_token }, () => {
        console.log('Token saved');
      });
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }
  };

  useEffect(() => {
    // Check if we already have a stored token
    chrome.storage.local.get(['linkedInToken'], (result) => {
      if (result.linkedInToken) {
        setToken(result.linkedInToken);
      }
    });
  }, []);

  return { token, authenticate };
};

export default useLinkedInAuth;