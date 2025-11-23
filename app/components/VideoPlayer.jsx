"use client";

import { useState } from 'react';
import { Api } from '../config';

export default function VideoPlayer({ initialStreamUrl, servers }) {
  const [streamUrl, setStreamUrl] = useState(initialStreamUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [activeServerId, setActiveServerId] = useState(null);

  const handleServerChange = async (serverId) => {
    if (isLoading) return; 
    setIsLoading(true);
    setActiveServerId(serverId);

    try {
      const res = await fetch(`${Api}/server/${serverId}`);
      if (!res.ok) {
        throw new Error('Gagal mengambil data server');
      }
      const data = await res.json();
      setStreamUrl(data.data.url);
    } catch (error) {
      console.error(error);
      alert("Gagal memuat server video.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="aspect-video w-full mb-4 bg-black rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
             <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-pink-500 border-t-transparent"></div>
          </div>
        ) : (
          <iframe
            key={streamUrl} 
            src={streamUrl}
            allowFullScreen
            className="w-full h-full border-0"
          ></iframe>
        )}
      </div>
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <p className="text-white font-semibold mb-3">Pilih Server:</p>
        <div className="flex flex-wrap gap-2">
          {servers?.map((quality) => (
            quality.serverList.length > 0 && (
              <div key={quality.title} className="flex flex-wrap items-center gap-2">
                {quality.serverList.map((server) => (
                  <button
                    key={server.serverId}
                    onClick={() => handleServerChange(server.serverId)}
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        activeServerId === server.serverId
                        ? 'bg-pink-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {server.title}
                  </button>
                ))}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}