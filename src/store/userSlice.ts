import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LinkedInAccount {
  linkedin_email: string;
  linkedin_profile_image: string;
  linkedin_id: string;
  linkedin_username: string | null;
  linkedin_name: string;
  linkedin_headline: string;
  linkedin_pages: any[];
}

interface UserState {
  id: string | null;
  email: string | null;
  name: string | null;
  givenName: string | null;
  familyName: string | null;
  profileImage: string | null;
  locale: string | null;
  isNew: boolean;
  linkedinConnected: boolean;
  aiCredits: number | null;
  planAiCredits: number | null;
  subscriptionStatus: string | null;
  trialEndDate: number | null;
  linkedinAccounts: LinkedInAccount[] | null;
  role: string | null;
}

const initialState: UserState = {
  id: null,
  email: null,
  name: null,
  givenName: null,
  familyName: null,
  profileImage: null,
  locale: null,
  isNew: false,
  linkedinConnected: false,
  aiCredits: null,
  planAiCredits: null,
  subscriptionStatus: null,
  trialEndDate: null,
  linkedinAccounts: null,
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    clearUser(state) {
      state.id = null;
      state.email = null;
      state.name = null;
      state.givenName = null;
      state.familyName = null;
      state.profileImage = null;
      state.locale = null;
      state.isNew = false;
      state.linkedinConnected = false;
      state.aiCredits = null;
      state.planAiCredits = null;
      state.subscriptionStatus = null;
      state.trialEndDate = null;
      state.linkedinAccounts = null;
      state.role = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;


