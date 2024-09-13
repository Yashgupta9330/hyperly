import axios from 'axios';

const getCookies = () => {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name] = value;
    return acc;
  }, {} as Record<string, string>);
  return cookies;
};

export const fetchLinkedInAnalyticsUpdates = async (urn: any) => {
  console.log("entry in urn for analytics", urn);

  try {
    const cookies = getCookies();
    const jsessionid = cookies['JSESSIONID'];
    const csrfToken = jsessionid?.replace(/"/g, '');

    console.log("urn", urn);
    console.log("jssessionid", csrfToken);

    const username=await chrome.storage.local.get('username');
    const user=username.username;
    console.log("username",user)
    const profileResponse = await axios.get(`https://www.linkedin.com/voyager/api/identity/profiles/${user}/dashboard`, {
      headers: {
        'csrf-token': csrfToken,
        'X-Restli-Protocol-Version': '2.0.0',
        'Accept': 'application/json',
      },
    });

    // API call for connections summary
    const connectionsResponse = await axios.get(`https://www.linkedin.com/voyager/api/relationships/connectionsSummary`, {
      headers: {
        'csrf-token': csrfToken,
        'X-Restli-Protocol-Version': '2.0.0',
        'Accept': 'application/json',
      },
    });

    const profileData = profileResponse.data;
    const connectionsData = connectionsResponse.data;

  
    const data = {
      numProfileViews: profileData.numProfileViews, 
      numSearchAppearances: profileData.numSearchAppearances, 
      numConnections: connectionsData.numConnections 
    };

    console.log("response for analytics", data);
    return data;

  } catch (error) {
    console.error('Error fetching profile updates:', error);
    throw error;
  }
};






/* 'accept': 'application/vnd.linkedin.normalized+json+2.1',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9,en-IN;q=0.8',
        'cookie': 'bcookie="v=2&63814ae3-0e37-4b05-8aae-7406752170f9"; li_sugr=6ecf36e3-f5e2-4fd9-a190-f800a5f70b99; bscookie="v=1&20240905084308beb46695-02cf-4317-8ab8-5e80e77c56ccAQEj2J4xHge2d3P0nJlpXTgnl7xsTwuG"; lang=v=2&lang=en-us; li_rm=AQECIqjKan85SwAAAZHCHgwf9RcR9LW_FRIYfsjaFa0y0ejGlDsn5ESpWi8D44i6c-A_SVDX1m3ccB-7er38X_wo8UfXmtI5KYsF7VhH4pqIIs1UhyhGvfDD; _gcl_au=1.1.500739935.1725538636; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; aam_uuid=31410869419113365214436681377383715271; liap=true; JSESSIONID="ajax:3939256869594346532"; timezone=Asia/Calcutta; li_theme=light; li_theme_set=app; AnalyticsSyncHistory=AQLilH0-OUeWQAAAAZHCHjTxC1Hg-DAxNGnXY_Kktry3SuiRhyD-s2XnY2jAmgRf6pnunhFXk-T3KB8VQlXiJA; _guid=ecf49417-9e6a-44ac-88af-8605531d3388; lms_ads=AQGfG3jSI3juSwAAAZHCHjZ-NPEb6tKTKHrx_VPL2W2eC6PLYuQfS82azDtG8o7JVi8P2clmiazNFflLql4AyCXtD4HNNAfb; lms_analytics=AQGfG3jSI3juSwAAAZHCHjZ-NPEb6tKTKHrx_VPL2W2eC6PLYuQfS82azDtG8o7JVi8P2clmiazNFflLql4AyCXtD4HNNAfb; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C19972%7CMCMID%7C31233330088171738904421810292229333516%7CMCAAMLH-1726143444%7C12%7CMCAAMB-1726143444%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1725545844s%7CNONE%7CvVersion%7C5.1.1%7CMCCIDH%7C-506825949; dfpfpt=8cf9c8d9b509411680a8dadd90fd90d1; fptctx2=taBcrIH61PuCVH7eNCyH0HyAAKgSb15ZEqidLg30r8NvyFXLOsK68H3GNRaKj%252f0Z7socNn6Sq5gDCl74b%252fRgpktvT9SZMy1uruc%252fHS%252fFL2cRmelkvQD0BJbAluotlB9JgmUTvQa5TeWdZDobcipbp6M5Z1TdsZbjCTYmwViljycqgujLdpB25FKU%252foNvPe%252fVsKQeUjqwlY8SylqYeJX7kjlRk2XFDGjqgVkbofimPrJsEEGgvD5eUuQtZ1SGjaS1i3ejhwxiilQ%252bupmHyRmjDN85nqx3maokjGJpIY34WmW9nJ3WOlAkmjUjPbmGuTQpsmjLnflKMFtWMt%252bpO4PtzAFxJw7tIEuk3a%252f0OTG7U9Y%253d; li_at=AQEDATzzj9kB_U40AAABkcJVidkAAAGR5mIN2U4AZTWdsWkJ-nnNPNZtOklO-pjzVUc52d6X8LeuelWrSridM_21DnP_yZf9bb2LHYmUEHnoDTWBqneZVDkk6Oxc2OpG9VRlypIxtCAfHRtlFZOxKkAY; PLAY_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImZsb3dUcmFja2luZ0lkIjoiUC9Za3lQUk5SK09LamNJd3Bob3owUT09In0sIm5iZiI6MTcyNTU0MzAzNiwiaWF0IjoxNzI1NTQzMDM2fQ.bbNA5tIZ8HAxdUnYwnXeH5Wnp2Lj_TZRbw3PZtki0z0; UserMatchHistory=AQLo04h8GM6bmQAAAZHCapLye_mJNNCTCEWmYZMxdDfToK0Wl25wgw1x8QZw82sVbv31RkHLWveFkiGjiUTtJUTcsYqeUrK6d-QqxqMgnIRFVLFPDh1d15kXKbFiRiI1TRbr2udUeF79l0C933_iWeKe-vYBMaMuiKyUjYP92vgTNI9XSCwYStyfTdSnKAdRkzVTDEd7FcTf0bLUO9ua0RBgM0--EFLAx7A-psOKoq4tZAIYd8fMtq-hmQXLqQUZLNHEYgMCVk8t5Cz_DR-Av_p1KIsgOb5gadpR7kTN_eL6PRlM4nrV8FqqJWwijC9Lql1WF2rmC9VQz0dI4MLxUPzqCXD5xctxqy87aJcD7pEifK9ZNA; lidc="b=OB33:s=O:r=O:a=O:p=O:g=4296:u=809:x=1:i=1725543651:t=1725629369:v=2:sig=AQGhyK6RkXQzr4hjzsEGjFWtDd2bDfJU',
        'csrf-token': 'ajax:3939256869594346532',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36' */




    //https://www.linkedin.com/voyager/api/graphql?variables=(analyticsEntityUrn:(profile:urn%3Ali%3Afsd_profile%3AACoAAExflgIBB43LGBhr-u0QegIE9iiuD8So-Do),surfaceType:CREATOR_AUDIENCE,query:(selectedFilters:List((key:resultType,value:List(AUDIENCES)),(key:timeRange,value:List(past_90_days)))))&queryId=voyagerPremiumDashAnalyticsView.ee3afa525ae1b74aedc8d8bfaaf6c13a'
    /* const response = await axios.get(`https://www.linkedin.com/voyager/api/graphql?variables=(analyticsEntityUrn:(profile:${encodeURIComponent(urn)}),surfaceType:CREATOR_CONTENT,query:(selectedFilters:List((key:resultType,value:List(IMPRESSIONS)),(key:timeRange,value:List(past_7_days)),(key:metricType,value:List(ENGAGEMENT)))))&queryId=voyagerPremiumDashAnalyticsView.ac7f39448aecf9d0835b2d770f646f67`, {
      headers: {
            'csrf-token': csrfToken,
          }    
    }); */