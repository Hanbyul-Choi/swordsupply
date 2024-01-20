import React from 'react';

import {supabase} from '@/supabase/supabase.config';

function GoogleSignIn() {
  return (
    <button
      className="mt-2 py-2 px-4 border-2 border-black rounded-md text-2xl"
      onClick={() => {
        supabase.auth.signInWithOAuth({
          provider: 'google',
        });
      }}>
      G
    </button>
  );
}

export default GoogleSignIn;
