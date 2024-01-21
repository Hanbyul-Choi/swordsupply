'use client';
import React from 'react';

import useSessionStore from '../src/store/session.store';

function Page() {
  const {session} = useSessionStore();
  console.log(session);
  return <div>admin</div>;
}

export default Page;
