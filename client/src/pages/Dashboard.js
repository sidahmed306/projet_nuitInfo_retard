import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bordeaux"></div>
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center text-red-500">Error loading dashboard</div>;
  }

  const statCards = [
    {
      title: 'Total Teams',
      value: stats.totalTeams,
      icon: '👥',
      color: 'bg-blue-500',
      link: '/teams',
    },
    {
      title: 'Total Challenges',
      value: stats.totalChallenges,
      icon: '🎯',
      color: 'bg-purple-500',
      link: '/challenges',
    },
    {
      title: 'Scores Recorded',
      value: stats.totalScores,
      icon: '🏆',
      color: 'bg-green-500',
      link: '/scores',
    },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-bordeaux mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">{card.title}</p>
                <p className="text-3xl font-bold text-bordeaux">{card.value}</p>
              </div>
              <div className={`${card.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}>
                {card.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Leaderboard Preview */}
      <div className="bg-white rounded-xl shadow-md p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold text-bordeaux mb-6 flex items-center">
          <span className="mr-2">🏅</span>
          Top Teams
        </h2>
        {stats.topTeams.length > 0 ? (
          <div className="space-y-4">
            {stats.topTeams.map((team, index) => (
              <div
                key={team.id}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-light-gray transition-colors animate-slide-up"
                style={{
                  animationDelay: `${0.4 + index * 0.1}s`,
                  borderLeft: `4px solid ${team.color}`,
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl bg-bordeaux">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{team.name}</h3>
                    <p className="text-gray-600 text-sm">{team.members}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-dark-orange">{team.totalPoints}</p>
                  <p className="text-gray-500 text-sm">points</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No teams with scores yet</p>
            <Link
              to="/teams"
              className="text-bordeaux hover:underline mt-2 inline-block"
            >
              Create your first team →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

