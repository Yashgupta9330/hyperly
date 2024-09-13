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
        console.log("url", url)
        const access_token = url.searchParams.get('access_token');
        console.log("access_token", access_token);
        if (access_token) {
          console.log("Access token received");
          chrome.storage.local.set({ accessToken: access_token });
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



/*chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {
    console.log("URL changed:", changeInfo.url);
    const url = new URL(changeInfo.url);
    console.log("Parsed URL:", url);
    const miniProfileUrn = url.searchParams.get('miniProfileUrn');
    if (miniProfileUrn) {
      console.log("Extracted miniProfileUrn:", miniProfileUrn);
      chrome.tabs.sendMessage(tabId, { action: "profileUpdates", miniProfileUrn: miniProfileUrn }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError.message);
        } else {
          console.log("Message sent successfully. Response:", response);
        }
      });
    } else {
      console.log("miniProfileUrn not found in URL.");
    }
  }
}); 


const handleUrlChange = async (tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    console.log("URL changed:", changeInfo.url);
    const url = new URL(changeInfo.url);
    console.log("Parsed URL:", url);
    const miniProfileUrn = url.searchParams.get('miniProfileUrn');
    if (miniProfileUrn) {
      console.log("Extracted miniProfileUrn:", miniProfileUrn);
      await chrome.storage.local.set({ "idUser": miniProfileUrn });
      chrome.tabs.sendMessage(tabId, { action: "profileUpdates", miniProfileUrn: miniProfileUrn }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError.message);
        } else {
          console.log("Message sent successfully. Response:", response);
        }
      });
    } else {
      console.log("miniProfileUrn not found in URL.");
    }
  }
}; */

chrome.tabs.onCreated.addListener((tab) => {
  console.log("onCreated");
  if (tab?.url?.includes("/in/")) {
    try {
      let split1 = tab.url.split("https://www.linkedin.com/in/")[1];
      let split2 = split1.split("/");
      let username = split2[0]?.split("?")?.[0];
      console.log("check username: " + username);
      fetchFromUserName(username);

    }
    catch (e) {
      console.log("Error in getting user posts: " + e.message);
    }
  }


  if (tab?.url?.includes("/posts/")) {
    try {
      let split1 = tab.url.split("https://www.linkedin.com/posts/")[1];
      let split2 = split1.split("_");
      let username = split2[0];
      console.log("check username from post: " + username);
      fetchFromUserName(username);

    }
    catch (e) {
      console.log("Error in getting user posts: " + e.message);
    }
  }

});

// Listen for tab updates
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab?.url?.includes("/in/") && changeInfo.status == 'complete') {
      try {
        let split1 = tab.url.split("https://www.linkedin.com/in/")[1];
        let split2 = split1.split("/");
        let username = split2[0]?.split("?")?.[0];
        console.log("check username: " + username);
        fetchFromUserName(tabId, username);
      } catch (e) {
        console.log("Error in getting user posts: " + e.message);
      }
    }

    if (tab?.url?.includes("/posts/") &&  changeInfo.status === 'complete') {
      try {
        let split1 = tab.url.split("https://www.linkedin.com/posts/")[1];
        let split2 = split1.split("_");
        let username = split2[0];
        console.log("check username from post: " + username);
        fetchFromUserName(tabId, username);
      } catch (e) {
        console.log("Error in getting user posts: " + e.message);
      }
    }
  }
 );

// Fetch data based on LinkedIn username
const fetchFromUserName = async (tabId, username) => {
  console.log("Fetching for username:", username);
  chrome.storage.local.get('accessToken', async (result) => {
    const accessToken = result.accessToken;
    if (accessToken) {
      console.log("Access token retrieved:", accessToken);

      let response = await fetch(`https://api.hyperly.ai/viral/${username}/dash_entity`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      let json = await response.json();
      console.log("Response JSON:", json);

      if (json?.dashEntityUrn) {
        console.log(`Fetching allowed for username: ${username} - id: ${json.dashEntityUrn}`);

        chrome.storage.local.set({
          username: username,
          dashEntityUrn: `urn:li:fsd_profile:${json.dashEntityUrn}`
        }, () => {
          console.log('Stored username and dashEntityUrn in local storage.');
        });

        let miniProfileUrn = `urn:li:fsd_profile:${json.dashEntityUrn}`;

        // Send message to the content script in the tab
        sendMessageWithRetry(tabId, { action: "profileUpdates", miniProfileUrn });
      } else {
        console.error('Error: No dashEntityUrn found in the response');
      }
    } else {
      console.error('Error: Access token not found in local storage');
    }
  });
}; 


function sendMessageWithRetry(tabId, message, maxRetries = 3, delay = 1000) {
  let retries = 0;

  function attempt() {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message:", chrome.runtime.lastError.message);
        if (retries < maxRetries) {
          retries++;
          setTimeout(attempt, delay);
        } else {
          console.error("Max retries reached. Message not sent.");
        }
      } else {
        console.log("Message sent successfully. Response:", response);
      }
    });
  }

  attempt();
}


   /* const getCookie = (isForceRefresh = false, countPost = 10) => {

      conf.cookie_JSESSIONID = "";
      conf.cookie_li_at = "";

      console.log("getCookie - countPost: " + countPost);

      chrome.cookies.get(
        { url: "https://www.linkedin.com", name: "li_at" },
        (cookie) => {
          if (cookie) {
            conf.cookie_li_at = cookie.value;
            chrome.storage.local.set({ "cookieLiAt": cookie.value });
            console.log("save cookieLiAt in local storage");
            sendUpdateMessageToTabs("cookie_updated");
          }

          fetchAll(isForceRefresh, countPost);

        },
      );
      chrome.cookies.get(
        { url: "https://www.linkedin.com", name: "JSESSIONID" },
        (cookie) => {
          if (cookie) {
            conf.cookie_JSESSIONID = cookie.value;
            chrome.storage.local.set({ "cookieJSESSIONID": cookie.value });
          }

          fetchAll(isForceRefresh, countPost);
        },
      );
    } 


    const fetchAll = async (isForceRefresh, countPost = 100) => {

      if (conf.cookie_JSESSIONID && conf.cookie_li_at) {

        console.log("fetchAll - have both cookies - countPost: " + countPost);

        chrome.storage.local.get([
          "idUser",
          "username",
          "dashEntityUrn",
          "lastRefreshDate",
          "savedData",
          "nbFetchDone",
          "companies",
          "nbFetchProfileViews",
        ], async (result) => {

          conf.idUser = result["idUser"];
          conf.username = result["username"];
          conf.dashEntityUrn = result["dashEntityUrn"];
          conf.nbFetchDone = result["nbFetchDone"];
          conf.companies = result["companies"] ? JSON.stringify(result["companies"]) : null;
          conf.nbFetchProfileViews = result["nbFetchProfileViews"] ? 0 : result["nbFetchProfileViews"];
          conf.userAgent = navigator.userAgent;

          console.log('fetchAll - conf:', conf);

          // in any case, send the cookies
          if (conf.idUser && conf.username && conf.cookie_li_at) {
            sendData("cookie", {
              dashEntityUrn: conf.dashEntityUrn,
              idUser: conf.idUser,
              username: conf.username,
              cookie_JSESSIONID: conf.cookie_JSESSIONID,
              cookie_li_at: conf.cookie_li_at,
              userAgent: conf.userAgent,
            }, conf);
          }

          if (conf.nbFetchDone && conf.nbFetchDone > 0)
            countPost = 10;

          console.log("fetchAll - nb fetched: " + conf.nbFetchDone + " - count: " + countPost);

          try {
            let savedDataString = result["savedData"];
            conf.savedData = savedDataString ? JSON.parse(savedDataString) : { posts: [] };
          }
          catch (e) {
            console.log(e);
            conf.savedData = { posts: [] };
          }
          console.log("savedData: ", conf.savedData);

          if (result["lastRefreshDate"]) {
            let tempDate = new Date(result["lastRefreshDate"]);
            if (!conf.lastRefreshDate || tempDate > conf.lastRefreshDate)
              conf.lastRefreshDate = tempDate;
          }

          console.log("userAgent: " + userAgent);

          console.log("fetchAll - idUser: " + idUser);
          console.log("fetchAll - lastRefreshDate: " + conf.lastRefreshDate);
          console.log("fetchAll - diff: " + ((new Date().getTime() - lastRefreshDate.getTime()) / 1000 / 60) + " minutes");
          isForceRefresh = true
          if (!conf.lastRefreshDate
            || (isForceRefresh && ((new Date().getTime() - conf.lastRefreshDate.getTime()) > (1000 * 60 * 60 * maxRefreshRateWhenForced)))
            || ((new Date().getTime() - conf.lastRefreshDate.getTime()) > (1000 * 60 * 60 * maxRefreshRate)
              || !conf?.idUser) //!conf?.idUser conditional check is required for users who logout or switch accounts or login after downloading the extension -- manoj.
          ) {


            console.log("will fetch");

            let newNbFetchDone = conf.nbFetchDone ? conf.nbFetchDone + 1 : 1;
            conf.lastRefreshDate = new Date();
            chrome.storage.local.set({ "lastRefreshDate": new Date().getTime(), nbFetchDone: newNbFetchDone });

            let newConf = await fetchMe(conf, countPost);
            conf = { ...conf, ...newConf };
            sendUpdateMessageToTabs("cookie_updated");

          }
          else {
            console.log("Last refresh too soon: " + Math.floor((new Date().getTime() - conf.lastRefreshDate.getTime()) / 1000 / 60) + " minutes ago")
          }
        });
      }
    } */
 