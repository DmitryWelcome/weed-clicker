'use client';

import { useState, useEffect } from 'react';

export default function DebugPage() {
  const [localStorageData, setLocalStorageData] = useState<string>('');
  const [sessionStorageData, setSessionStorageData] = useState<string>('');

  useEffect(() => {
    // Проверяем, что мы в браузере
    if (typeof window === 'undefined') return;

    // Получаем все данные из localStorage
    const allData: Record<string, unknown> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        try {
          allData[key] = JSON.parse(localStorage.getItem(key) || '');
        } catch {
          allData[key] = localStorage.getItem(key);
        }
      }
    }
    
    setLocalStorageData(JSON.stringify(allData, null, 2));
    
    // Получаем все данные из sessionStorage
    const allSessionData: Record<string, unknown> = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        try {
          allSessionData[key] = JSON.parse(sessionStorage.getItem(key) || '');
        } catch {
          allSessionData[key] = sessionStorage.getItem(key);
        }
      }
    }
    
    setSessionStorageData(JSON.stringify(allSessionData, null, 2));
  }, []);

  const clearAllData = () => {
    if (typeof window === 'undefined') return;
    localStorage.clear();
    sessionStorage.clear();
    setLocalStorageData('');
    setSessionStorageData('');
  };

  const clearWeedData = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('weedSessions');
    setLocalStorageData(prev => {
      const data = JSON.parse(prev || '{}') as Record<string, unknown>;
      delete data.weedSessions;
      return JSON.stringify(data, null, 2);
    });
  };

  // Проверяем, что мы в браузере
  if (typeof window === 'undefined') {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">🔍 Debug - Просмотр данных браузера</h1>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 Debug - Просмотр данных браузера</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* localStorage */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-green-400">localStorage</h2>
            <div className="mb-4">
              <button
                onClick={clearWeedData}
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded mr-2"
              >
                Очистить weedSessions
              </button>
              <button
                onClick={clearAllData}
                className="bg-red-800 hover:bg-red-700 px-4 py-2 rounded"
              >
                Очистить всё
              </button>
            </div>
            <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto max-h-96">
              {localStorageData || 'Нет данных'}
            </pre>
          </div>

          {/* sessionStorage */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-400">sessionStorage</h2>
            <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto max-h-96">
              {sessionStorageData || 'Нет данных'}
            </pre>
          </div>
        </div>

        {/* Информация о браузере */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">ℹ️ Информация о браузере</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>User Agent:</strong> {navigator.userAgent}
            </div>
            <div>
              <strong>Платформа:</strong> {navigator.platform}
            </div>
            <div>
              <strong>Язык:</strong> {navigator.language}
            </div>
            <div>
              <strong>Cookie включены:</strong> {navigator.cookieEnabled ? 'Да' : 'Нет'}
            </div>
            <div>
              <strong>Онлайн:</strong> {navigator.onLine ? 'Да' : 'Нет'}
            </div>
            <div>
              <strong>Размер localStorage:</strong> {localStorage.length} ключей
            </div>
          </div>
        </div>

        {/* Пути к файлам */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-purple-400">📁 Пути к файлам данных</h2>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Chrome:</strong> <code>C:\Users\[Пользователь]\AppData\Local\Google\Chrome\User Data\Default\Local Storage\leveldb\</code>
            </div>
            <div>
              <strong>Firefox:</strong> <code>C:\Users\[Пользователь]\AppData\Roaming\Mozilla\Firefox\Profiles\[профиль]\storage\default\</code>
            </div>
            <div>
              <strong>Edge:</strong> <code>C:\Users\[Пользователь]\AppData\Local\Microsoft\Edge\User Data\Default\Local Storage\leveldb\</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 