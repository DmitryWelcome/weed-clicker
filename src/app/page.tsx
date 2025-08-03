'use client';

import { useState, useEffect, useCallback } from 'react';

interface Session {
  id: number;
  user_id: string;
  date: string;
  time: string;
  amount: number;
  type: string;
  created_at: string;
}

export default function WeedCounter() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSession, setNewSession] = useState({
    amount: 0.1,
    type: 'joint',
  });

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/sessions?userId=default_user');
      if (!response.ok) {
        throw new Error('Failed to fetch sessions');
      }
      const data = await response.json();
      setSessions(data);
      calculateTotal(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch sessions');
    } finally {
      setLoading(false);
    }
  }, []);

  // Загрузка данных из базы данных
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const calculateTotal = (sessionsList: Session[]) => {
    const total = sessionsList.reduce(
      (sum, session) => sum + session.amount,
      0
    );
    setTotalAmount(total);
  };

  const addSession = async () => {
    try {
      const now = new Date();
      const sessionData = {
        userId: 'default_user',
        date: now.toLocaleDateString('ru-RU'),
        time: now.toLocaleTimeString('ru-RU'),
        amount: newSession.amount,
        type: newSession.type,
      };

      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      const newSessionData = await response.json();
      setSessions((prev) => [newSessionData, ...prev]);
      setNewSession({ amount: 0.1, type: 'joint' });
      setShowAddForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create session');
    }
  };

  const deleteSession = async (id: number) => {
    try {
      const response = await fetch(`/api/sessions/${id}?userId=default_user`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete session');
      }

      setSessions((prev) => prev.filter((session) => session.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete session');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'joint':
        return '🚬';
      case 'bong':
        return '💨';
      case 'pipe':
        return '🫖';
      case 'edible':
        return '🍪';
      default:
        return '🌿';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'joint':
        return 'Косяк';
      case 'bong':
        return 'Бонг';
      case 'pipe':
        return 'Трубка';
      case 'edible':
        return 'Еда';
      default:
        return 'Другое';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌿</div>
          <p className="text-xl">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4">🌿 Weed Counter</h1>
          <p className="text-xl text-green-200">Отслеживай свои сессии</p>
          <p className="text-sm text-green-300 mt-2">
            Данные сохраняются в Neon PostgreSQL
          </p>
        </div>

        {/* Ошибка */}
        {error && (
          <div className="bg-red-800/50 backdrop-blur-sm rounded-2xl p-4 mb-8 border border-red-600/30">
            <p className="text-red-200">Ошибка: {error}</p>
            <button
              onClick={() => setError(null)}
              className="text-red-300 hover:text-red-100 mt-2"
            >
              ✕ Закрыть
            </button>
          </div>
        )}

        {/* Статистика */}
        <div className="bg-green-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-green-600/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300">
                {sessions.length}
              </div>
              <div className="text-green-200">Всего сессий</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300">
                {totalAmount.toFixed(1)}g
              </div>
              <div className="text-green-200">Общий вес</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300">
                {sessions.length > 0
                  ? (totalAmount / sessions.length).toFixed(2)
                  : 0}
                g
              </div>
              <div className="text-green-200">Среднее за сессию</div>
            </div>
          </div>
        </div>

        {/* Кнопка добавления */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ➕ Добавить сессию
          </button>
        </div>

        {/* Форма добавления */}
        {showAddForm && (
          <div className="bg-green-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-green-600/30">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Новая сессия
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-green-200 mb-2">
                  Количество (грамм)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={newSession.amount}
                  onChange={(e) =>
                    setNewSession((prev) => ({
                      ...prev,
                      amount: parseFloat(e.target.value) || 0.1,
                    }))
                  }
                  className="w-full p-3 rounded-lg bg-green-700/50 border border-green-600 text-white focus:outline-none focus:border-green-400"
                />
              </div>
              <div>
                <label className="block text-green-200 mb-2">Тип</label>
                <select
                  value={newSession.type}
                  onChange={(e) =>
                    setNewSession((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full p-3 rounded-lg bg-green-700/50 border border-green-600 text-white focus:outline-none focus:border-green-400"
                >
                  <option value="joint">🚬 Косяк</option>
                  <option value="bong">💨 Бонг</option>
                  <option value="pipe">🫖 Трубка</option>
                  <option value="edible">🍪 Еда</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={addSession}
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                ✅ Добавить
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                ❌ Отмена
              </button>
            </div>
          </div>
        )}

        {/* Список сессий */}
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌿</div>
              <p className="text-xl text-green-200">
                Пока нет сессий. Добавь первую!
              </p>
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className="bg-green-800/30 backdrop-blur-sm rounded-xl p-4 border border-green-600/20 hover:border-green-500/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{getTypeIcon(session.type)}</div>
                    <div>
                      <div className="font-bold text-lg">
                        {getTypeName(session.type)}
                      </div>
                      <div className="text-green-200 text-sm">
                        {session.date} в {session.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-bold text-xl">{session.amount}g</div>
                      <div className="text-green-200 text-sm">вес</div>
                    </div>
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-lg transition-colors"
                      title="Удалить сессию"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
