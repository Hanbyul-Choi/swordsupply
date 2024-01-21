import React from 'react';

function Page({params: {id}}: {params: {id: string}}) {
  return <div className="mt-60">{id}</div>;
}

export default Page;
