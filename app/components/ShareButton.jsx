"use client";

import { useState } from 'react';

const ShareIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.195.025.39.05.588.05h6.346a2.25 2.25 0 0 1 0 2.186m-6.346-2.186a2.25 2.25 0 0 0 0 2.186m6.346-2.186-3.182 1.909m3.182-1.909-3.182-1.909m0 0a2.25 2.25 0 0 0-2.186 0m2.186 0-3.182 1.909m0 0a2.25 2.25 0 0 0 0 2.186m2.186-2.186 3.182 1.909" />
  </svg>
);


const ShareButton = ({ title, slug }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/anime/${slug}`;
    const shareData = {
      title: title,
      text: `Tonton ${title} sekarang!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('Halaman berhasil dibagikan');
      } catch (err) {
        console.error('Gagal membagikan:', err);
      }
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      });
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`flex items-center gap-2 font-bold py-2 px-5 rounded-lg transition-all duration-300 ${
        isCopied 
        ? 'bg-green-500 text-white' 
        : 'bg-pink-600 hover:bg-pink-700 text-white transform hover:scale-105'
      }`}
    >
      <ShareIcon className="w-5 h-5" />
      <span>{isCopied ? 'Link Copied!' : 'Share'}</span>
    </button>
  );
};

export default ShareButton;