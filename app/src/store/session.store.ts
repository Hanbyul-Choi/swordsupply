import {create} from 'zustand';

import type {Tables} from '@/app/types/supabase';

interface SessionStore {
  session: Tables<'users'> | null;
  isLoaded: boolean;
  setSession: (newSession: Tables<'users'> | null) => void;
  signOut: () => void;
}

const useSessionStore = create<SessionStore>(set => ({
  session: null,
  isLoaded: false,
  setSession: newSession => set({session: newSession, isLoaded: true}),
  signOut: () => set({session: null}),
}));

export default useSessionStore;
