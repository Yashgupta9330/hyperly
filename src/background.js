const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization';
const CLIENT_ID = '86id7o3frfeuam';
const REDIRECT_URI = 'https://api.hyperly.ai/linkedin/extension/auth';
const SCOPES = ['openid', 'profile', 'email', 'w_member_social', 'r_basicprofile', 'r_organization_social', 'rw_organization_admin', 'w_organization_social'];


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in background:', request.action);
  if (request.action === 'authenticate') {
    authenticate(sendResponse); 
    return true;  
  }
});

function authenticate(sendResponse) {
  const authUrl = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86id7o3frfeuam&redirect_uri=https://api.hyperly.ai/linkedin/extension/auth&scope=openid%20profile%20email%20w_member_social%20r_basicprofile%20r_organization_social%20rw_organization_admin%20w_organization_social";

  console.log("Initiating authentication");

  chrome.identity.launchWebAuthFlow(
    {
      url: authUrl,
      interactive: true
    },
    (redirectUrl) => {
      if (chrome.runtime.lastError) {
        console.error('LinkedIn auth error:', chrome.runtime.lastError);
        sendResponse({ action: 'authError', error: chrome.runtime.lastError.message }); 
        return;
      }
      
      if (redirectUrl) {
        const url = new URL(redirectUrl);
        console.log("url",url)
        const access_token = url.searchParams.get('access_token');
        console.log("access_token", access_token);
        if (access_token) {
          console.log("Access token received");
          sendResponse({ action: 'authSuccess', token: access_token });  
        } 
        else {
          console.error('No access token found in the redirect URL');
          sendResponse({ action: 'authError', error: 'No access token found' });  
        }
      } 
      else {
        console.error('No redirect URL received');
        sendResponse({ action: 'authError', error: 'Authentication failed' });  
      }
    }
  );
}


