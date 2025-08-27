import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, Globe, Shield } from 'lucide-react';

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [swStatus, setSwStatus] = useState('Not registered');
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }

    // Listen to online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Update time every second
    const timer = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(timer);
    };
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/01_service_worker/sw.js');
      console.log('SW registered successfully');
      setSwStatus('Registered');

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                setSwStatus('Update available');
              } else {
                setSwStatus('Ready for offline use');
              }
            }
          });
        }
      });

    } catch (error) {
      console.error('SW registration failed:', error);
      setSwStatus('Registration failed');
    }
  };

  const forceUpdate = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.update();
          setSwStatus('Updating...');
        }
      });
    }
  };

  const simulateOffline = () => {
    // This will only work in Chrome DevTools
    // Go to Network tab -> Check "Offline"
    alert('To test offline mode:\n1. Open Chrome DevTools\n2. Go to Network tab\n3. Check "Offline"\n4. Refresh the page or navigate to a new URL');
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <div className="p-6 mb-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-800">
              <Shield className="text-blue-600" />
              Service Worker Test App
            </h1>
            <div className="flex items-center gap-2">
              {isOnline ? (
                <div className="flex items-center text-green-600">
                  <Wifi size={20} />
                  <span className="ml-1 font-medium">Online</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <WifiOff size={20} />
                  <span className="ml-1 font-medium">Offline</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-gray-50">
              <h2 className="mb-3 text-lg font-semibold text-gray-700">Service Worker Status</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Registration:</span>
                  <span className={`font-medium ${
                    swStatus.includes('failed') ? 'text-red-600' :
                    swStatus.includes('Registered') || swStatus.includes('Ready') ? 'text-green-600' :
                    'text-blue-600'
                  }`}>
                    {swStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Browser Support:</span>
                  <span className={`font-medium ${
                    'serviceWorker' in navigator ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {'serviceWorker' in navigator ? 'Supported' : 'Not Supported'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span className="font-medium text-gray-600">{lastUpdated}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50">
              <h2 className="mb-3 text-lg font-semibold text-gray-700">Test Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={forceUpdate}
                  className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  <RefreshCw size={16} />
                  Force SW Update
                </button>
                <button
                  onClick={simulateOffline}
                  className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-700"
                >
                  <Globe size={16} />
                  Test Offline Mode
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">How to Test</h2>
          <div className="space-y-4 text-gray-700">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <h3 className="mb-2 font-semibold text-blue-800">1. Basic Service Worker Test</h3>
              <p>Check that the Service Worker is registered successfully. You should see "Registered" status above.</p>
            </div>

            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <h3 className="mb-2 font-semibold text-green-800">2. Offline Fallback Test</h3>
              <ul className="pl-5 space-y-1 list-disc">
                <li>Open Chrome DevTools (F12)</li>
                <li>Go to the Network tab</li>
                <li>Check the "Offline" checkbox</li>
                <li>Try to navigate to a non-existent page or refresh</li>
                <li>You should see the offline fallback page</li>
              </ul>
            </div>

            <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
              <h3 className="mb-2 font-semibold text-purple-800">3. Cache Inspection</h3>
              <ul className="pl-5 space-y-1 list-disc">
                <li>Open Chrome DevTools</li>
                <li>Go to Application tab → Storage → Cache Storage</li>
                <li>You should see "offline-cache-v1" with cached files</li>
              </ul>
            </div>

            <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
              <h3 className="mb-2 font-semibold text-yellow-800">4. Service Worker Console</h3>
              <p>Check the browser console for Service Worker logs like "Service Worker installing..." and "SW registered successfully".</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
