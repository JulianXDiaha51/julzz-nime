// File: components/Video/VideoPlayer.jsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchVideoServer } from '@/lib/api';
import VideoControls from '@/components/Video/VideoControls';
import VideoQualitySelector from '@/components/Video/VideoQualitySelector';
import VideoSettings from '@/components/Video/VideoSettings';
import { PlayIcon, PauseIcon, VolumeUpIcon, SettingsIcon, FullscreenIcon } from '@/components/Icons';

/**
 * VideoPlayer Component
 * 
 * @param {Object} props
 * @param {string} props.initialStreamUrl - Initial video stream URL
 * @param {Array} props.servers - Available video servers and qualities
 * @param {string} props.animeTitle - Title of the anime (for tracking)
 * @param {string} props.episodeTitle - Title of the episode
 * @param {boolean} [props.autoPlay] - Auto-play video
 * @param {boolean} [props.showControls] - Show video controls
 * @param {string} [props.poster] - Video poster image URL
 */

export default function VideoPlayer({ 
  initialStreamUrl, 
  servers,
  animeTitle,
  episodeTitle,
  autoPlay = false,
  showControls = true,
  poster,
  className = '',
}) {
  // State
  const [streamUrl, setStreamUrl] = useState(initialStreamUrl);
  const [activeServerId, setActiveServerId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [error, setError] = useState(null);

  // Refs
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Video events handlers
  const handleLoadedMetadata = () => {
    setDuration(videoRef.current?.duration || 0);
    setIsLoading(false);
    
    // Auto-play if enabled
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current?.currentTime || 0);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setError(null);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleWaiting = () => {
    setBuffering(true);
  };

  const handlePlaying = () => {
    setBuffering(false);
  };

  const handleError = (e) => {
    console.error('Video error:', e);
    setError('Failed to load video. Please try another server.');
    setIsLoading(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    // Could trigger next episode auto-play here
  };

  // Video control functions
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(err => {
        console.error('Play failed:', err);
        setError('Cannot play video. Try another server.');
      });
    }
  }, [isPlaying]);

  const handleSeek = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume || 0.5;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const changePlaybackRate = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // Server change handler
  const handleServerChange = async (serverId, serverTitle) => {
    if (isLoading || activeServerId === serverId) return;
    
    setIsLoading(true);
    setActiveServerId(serverId);
    setError(null);
    setBuffering(true);

    try {
      const data = await fetchVideoServer(serverId);
      
      if (data?.url) {
        setStreamUrl(data.url);
        
        // Track server change
        console.log(`Switched to server: ${serverTitle}`);
        
        // Reset video state
        if (videoRef.current) {
          videoRef.current.load();
          
          // Auto-play after loading
          setTimeout(() => {
            videoRef.current?.play().catch(console.error);
          }, 500);
        }
      } else {
        throw new Error('Invalid server response');
      }
    } catch (error) {
      console.error('Server change failed:', error);
      setError(`Failed to load server "${serverTitle}". Please try another.`);
    } finally {
      setIsLoading(false);
      setBuffering(false);
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!videoRef.current) return;
      
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleSeek(Math.max(0, currentTime - 10));
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleSeek(Math.min(duration, currentTime + 10));
          break;
        case 'ArrowUp':
          e.preventDefault();
          handleVolumeChange(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleVolumeChange(Math.max(0, volume - 0.1));
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case '>':
        case '.':
          e.preventDefault();
          changePlaybackRate(Math.min(2, playbackRate + 0.25));
          break;
        case '<':
        case ',':
          e.preventDefault();
          changePlaybackRate(Math.max(0.5, playbackRate - 0.25));
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, currentTime, duration, volume, playbackRate]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Auto-hide controls
  useEffect(() => {
    const hideControls = () => {
      // Hide controls logic
    };

    const startControlsTimeout = () => {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(hideControls, 3000);
    };

    if (showControls) {
      startControlsTimeout();
    }

    return () => clearTimeout(controlsTimeoutRef.current);
  }, [showControls, isPlaying]);

  // Initialize active server
  useEffect(() => {
    if (servers?.length > 0) {
      const firstQuality = servers[0];
      if (firstQuality?.serverList?.length > 0) {
        const firstServer = firstQuality.serverList[0];
        setActiveServerId(firstServer.serverId);
      }
    }
  }, [servers]);

  return (
    <div 
      ref={containerRef}
      className={`relative bg-black rounded-xl overflow-hidden ${className}`}
      onMouseMove={() => {
        // Reset controls timeout on mouse move
        clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
          // Hide controls
        }, 3000);
      }}
    >
      {/* Video Container */}
      <div className="relative aspect-video w-full">
        {/* Video Element */}
        <video
          ref={videoRef}
          src={streamUrl}
          poster={poster}
          className="w-full h-full"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onPlay={handlePlay}
          onPause={handlePause}
          onWaiting={handleWaiting}
          onPlaying={handlePlaying}
          onError={handleError}
          onEnded={handleEnded}
          playsInline
          preload="auto"
        />

        {/* Loading Overlay */}
        {(isLoading || buffering) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayIcon className="w-8 h-8 text-white opacity-50" />
                </div>
              </div>
              <p className="mt-4 text-white font-medium">
                {buffering ? 'Buffering...' : 'Loading video...'}
              </p>
              {buffering && (
                <p className="text-sm text-gray-400 mt-2">Streaming from server</p>
              )}
            </div>
          </div>
        )}

        {/* Error Overlay */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="text-center max-w-md p-6">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Video Error</h3>
              <p className="text-gray-300 mb-4">{error}</p>
              <button
                onClick={() => setError(null)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Title Overlay */}
        <div className="absolute top-4 left-4 right-4 pointer-events-none">
          <div className="inline-block bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
            <h2 className="text-white font-bold truncate">{animeTitle}</h2>
            <p className="text-gray-300 text-sm truncate">{episodeTitle}</p>
          </div>
        </div>

        {/* Play/Pause Overlay Button */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center group"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <div className={`transition-all duration-300 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}>
            <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
              {isPlaying ? (
                <PauseIcon className="w-10 h-10 text-white" />
              ) : (
                <PlayIcon className="w-10 h-10 text-white ml-1" />
              )}
            </div>
          </div>
        </button>

        {/* Video Controls */}
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center gap-3 text-xs text-gray-300 mb-1">
                <span>{formatTime(currentTime)}</span>
                <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="p-2 text-white hover:text-red-500 transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <PauseIcon className="w-5 h-5" />
                  ) : (
                    <PlayIcon className="w-5 h-5" />
                  )}
                </button>

                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-2 text-white hover:text-red-500 transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    <VolumeUpIcon className="w-5 h-5" />
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-20 accent-red-500"
                    aria-label="Volume"
                  />
                </div>

                {/* Time Display */}
                <div className="text-sm text-gray-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Playback Rate */}
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 text-white hover:text-red-500 transition-colors"
                  aria-label="Settings"
                >
                  <SettingsIcon className="w-5 h-5" />
                </button>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-white hover:text-red-500 transition-colors"
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  <FullscreenIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Settings Dropdown */}
            {showSettings && (
              <VideoSettings
                playbackRate={playbackRate}
                onChangePlaybackRate={changePlaybackRate}
                quality={activeServerId}
                onClose={() => setShowSettings(false)}
              />
            )}
          </div>
        )}
      </div>

      {/* Server/Quality Selector */}
      <div className="p-4 bg-gray-900/50 border-t border-gray-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-semibold mb-2">Video Quality</h3>
            <p className="text-sm text-gray-400">
              Current: <span className="text-red-400">HD</span>
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {servers?.map((quality) => (
              quality.serverList.length > 0 && (
                <div key={quality.title} className="flex flex-wrap gap-2">
                  {quality.serverList.map((server) => (
                    <button
                      key={server.serverId}
                      onClick={() => handleServerChange(server.serverId, server.title)}
                      disabled={isLoading}
                      className={`
                        px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${activeServerId === server.serverId
                          ? 'bg-red-600 text-white shadow-lg shadow-red-500/20'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                        }
                      `}
                    >
                      <div className="flex items-center gap-2">
                        {server.title}
                        {activeServerId === server.serverId && (
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="p-3 bg-gray-900/30 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          Shortcuts: <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-300 mx-1">Space</kbd> Play/Pause • 
          <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-300 mx-1">←→</kbd> Seek • 
          <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-300 mx-1">F</kbd> Fullscreen
        </p>
      </div>
    </div>
  );
}

// Bonus: Separate components for better organization
