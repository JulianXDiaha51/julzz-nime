// File: components/Share/ShareButton.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  ShareIcon, 
  LinkIcon, 
  CheckIcon, 
  FacebookIcon, 
  TwitterIcon, 
  WhatsAppIcon,
  TelegramIcon,
  RedditIcon,
  CopyIcon
} from '@/components/Icons';

/**
 * ShareButton Component
 * 
 * @param {Object} props
 * @param {string} props.title - Title of the content to share
 * @param {string} props.slug - Slug/ID of the content
 * @param {string} [props.text] - Custom share text
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant] - Button variant: 'primary' | 'secondary' | 'outline'
 * @param {string} [props.size] - Button size: 'sm' | 'md' | 'lg'
 * @param {boolean} [props.showSocialIcons] - Show social media share options
 * @param {string} [props.image] - Image URL to share (for social media)
 */

const ShareButton = ({ 
  title, 
  slug, 
  text,
  className = '',
  variant = 'primary',
  size = 'md',
  showSocialIcons = true,
  image,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Get share URL
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/anime/${slug}`
    : '';

  // Get share text
  const shareText = text || `Check out "${title}" - Watch now!`;

  // Social media platforms
  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: <FacebookIcon className="w-5 h-5" />,
      color: 'hover:bg-blue-500 hover:text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Twitter',
      icon: <TwitterIcon className="w-5 h-5" />,
      color: 'hover:bg-sky-500 hover:text-white',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'WhatsApp',
      icon: <WhatsAppIcon className="w-5 h-5" />,
      color: 'hover:bg-green-500 hover:text-white',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    },
    {
      name: 'Telegram',
      icon: <TelegramIcon className="w-5 h-5" />,
      color: 'hover:bg-blue-400 hover:text-white',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      name: 'Reddit',
      icon: <RedditIcon className="w-5 h-5" />,
      color: 'hover:bg-orange-500 hover:text-white',
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`,
    },
  ];

  // Button variants
  const variantClasses = {
    primary: 'bg-red-600 hover:bg-red-700 text-white',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-300',
    outline: 'bg-transparent border border-gray-700 hover:bg-gray-800 text-gray-300',
  };

  // Button sizes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Handle native share
  const handleNativeShare = async () => {
    if (!navigator.share) {
      setIsOpen(true);
      return;
    }

    try {
      const shareData = {
        title: title,
        text: shareText,
        url: shareUrl,
      };

      if (image) {
        shareData.files = [new File([image], 'image.jpg', { type: 'image/jpeg' })];
      }

      await navigator.share(shareData);
      
      // Increment share count
      setShareCount(prev => prev + 1);
      
      // Track share event (optional)
      console.log('Content shared successfully');
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
        setIsOpen(true);
      }
    }
  };

  // Handle copy link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
      
      // Close menu after copy
      setTimeout(() => setIsOpen(false), 1000);
      
      // Track copy event
      console.log('Link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Load share count from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem(`share-count-${slug}`);
    if (savedCount) {
      setShareCount(parseInt(savedCount));
    }
  }, [slug]);

  // Save share count to localStorage
  useEffect(() => {
    if (shareCount > 0) {
      localStorage.setItem(`share-count-${slug}`, shareCount.toString());
    }
  }, [shareCount, slug]);

  return (
    <>
      <div className="relative inline-block">
        {/* Main Share Button */}
        <button
          ref={buttonRef}
          onClick={handleNativeShare}
          className={`
            inline-flex items-center justify-center gap-2
            font-medium rounded-lg transition-all duration-200
            active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900
            ${variantClasses[variant]}
            ${sizeClasses[size]}
            ${className}
          `}
          aria-label="Share"
          aria-expanded={isOpen}
          aria-haspopup="true"
          {...props}
        >
          <ShareIcon className="w-5 h-5" />
          <span>Share</span>
          {shareCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 bg-white/20 text-xs rounded-full">
              {shareCount}
            </span>
          )}
        </button>

        {/* Share Menu Dropdown */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            {/* Menu */}
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50 animate-slideDown origin-top-right"
              role="menu"
              aria-orientation="vertical"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-800">
                <h3 className="font-semibold text-white mb-1">Share "{title}"</h3>
                <p className="text-xs text-gray-400 truncate">{shareUrl}</p>
              </div>

              {/* Copy Link Section */}
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 p-2 bg-gray-800 rounded-lg">
                    <LinkIcon className="w-5 h-5 text-gray-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300">Copy link to share</p>
                    <p className="text-xs text-gray-500 truncate">{shareUrl}</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyLink}
                  className={`
                    w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium
                    transition-colors duration-200
                    ${isCopied 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }
                  `}
                  disabled={isCopied}
                >
                  {isCopied ? (
                    <>
                      <CheckIcon className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <CopyIcon className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </button>
              </div>

              {/* Social Media Share Options */}
              {showSocialIcons && (
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Share on social media</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {socialPlatforms.map((platform) => (
                      <a
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          flex flex-col items-center justify-center p-3 rounded-lg
                          bg-gray-800 text-gray-400 transition-all duration-200
                          ${platform.color}
                          hover:scale-105
                        `}
                        aria-label={`Share on ${platform.name}`}
                        onClick={() => setShareCount(prev => prev + 1)}
                      >
                        {platform.icon}
                        <span className="text-xs mt-1">{platform.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* QR Code Option (Optional) */}
              <div className="p-4 border-t border-gray-800">
                <button
                  className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors"
                  onClick={() => {
                    // Generate QR code logic here
                    console.log('QR code generation');
                  }}
                >
                  Generate QR Code
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add CSS animation */}
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

// Optional: Export as both default and named
export { ShareButton };
export default ShareButton;

// Bonus: Icons file (components/Icons/index.jsx)
// Add these icons to your Icons collection
