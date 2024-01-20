import {create} from 'zustand';

import type {User} from '@supabase/supabase-js';

interface SessionStore {
  session: User | null;
  isLoaded: boolean;
  setSession: (newSession: User | null) => void;
  signOut: () => void;
}

const useSessionStore = create<SessionStore>(set => ({
  session: null,
  isLoaded: false,
  setSession: newSession => set({session: newSession, isLoaded: true}),
  signOut: () => set({session: null}),
}));

export default useSessionStore;
