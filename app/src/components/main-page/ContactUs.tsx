import React from 'react';

function ContactUs() {
  return (
    <div className="w-full bg-[url('/bannerBg.png')] bg-slate-100 p-14">
      <div className="max-w-[1080px] mx-auto flex items-center">
        <h3 className="text-white text-end text-4xl font-semibold mr-10 font-roboto">Contact Us</h3>
        <a
          target="_blank"
          href="https://prfl.link/@sword"
          className="border p-2 rounded-md bg-black text-white hover:opacity-75">
          문의하기 →
        </a>
      </div>
    </div>
  );
}

export default ContactUs;
