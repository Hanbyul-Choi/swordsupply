import React from 'react';

import Image from 'next/image';

function ContactUs() {
  return (
    <div className="w-full bg-slate-100 p-14">
      <div className="max-w-[1080px] mx-auto flex text-en justify-between">
        <Image src={'/ContactUsImg.jpg'} alt="contact us" width={0} height={0} sizes="100%" style={{width: '60%'}} />
        <h3 className="text-end text-4xl font-semibold mb-6 font-roboto">Contact Us</h3>
      </div>
    </div>
  );
}

export default ContactUs;
