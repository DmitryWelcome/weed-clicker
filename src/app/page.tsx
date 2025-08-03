'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Session {
  id: string;
  date: string;
  time: string;
  amount: number;
  type: string;
}

export default function WeedCounter() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSession, setNewSession] = useState({
    amount: 0.1,
    type: 'joint',
  });

  // Загрузка данных из localStorage при монтировании
  useEffect(() => {
    const savedSessions = localStorage.getItem('weedSessions');
    if (savedSessions) {
      const parsed = JSON.parse(savedSessions);
      setSessions(parsed);
      calculateTotal(parsed);
    }
  }, []);

  // Сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('weedSessions', JSON.stringify(sessions));
    calculateTotal(sessions);
  }, [sessions]);

  const calculateTotal = (sessionsList: Session[]) => {
    const total = sessionsList.reduce(
      (sum, session) => sum + session.amount,
      0
    );
    setTotalAmount(total);
  };

  const addSession = () => {
    const now = new Date();
    const session: Session = {
      id: Date.now().toString(),
      date: now.toLocaleDateString('ru-RU'),
      time: now.toLocaleTimeString('ru-RU'),
      amount: newSession.amount,
      type: newSession.type,
    };

    setSessions((prev) => [session, ...prev]);
    setNewSession({ amount: 0.1, type: 'joint' });
    setShowAddForm(false);
  };

  const deleteSession = (id: string) => {
    setSessions((prev) => prev.filter((session) => session.id !== id));
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold mb-4">🌿 Weed Counter</h1>
          <p className="text-xl text-green-200">Отслеживай свои сессии</p>
        </motion.div>

        {/* Статистика */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-green-600/30"
        >
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
        </motion.div>

        {/* Кнопка добавления */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ➕ Добавить сессию
          </button>
        </motion.div>

        {/* Форма добавления */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-green-600/30"
          >
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
          </motion.div>
        )}

        {/* Список сессий */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌿</div>
              <p className="text-xl text-green-200">
                Пока нет сессий. Добавь первую!
              </p>
            </div>
          ) : (
            sessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
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
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
