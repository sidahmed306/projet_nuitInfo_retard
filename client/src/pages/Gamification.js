import React, { useState, useEffect } from 'react';
import { teamsAPI, scoresAPI } from '../services/api';

const Gamification = () => {
  const [teams, setTeams] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [teamsRes, scoresRes] = await Promise.all([
        teamsAPI.getAll(),
        scoresAPI.getAll(),
      ]);
      setTeams(teamsRes.data);
      setScores(scoresRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTeamStats = (teamId) => {
    const teamScores = scores.filter((s) => s.teamId === teamId);
    const totalPoints = teamScores.reduce((sum, s) => sum + s.points, 0);
    const badges = teamScores.filter((s) => s.badge).map((s) => s.badge);
    return { totalPoints, badges, scoreCount: teamScores.length };
  };

  const predefinedBadges = [
    { name: 'First Blood', icon: '🩸', description: 'First team to complete a challenge' },
    { name: 'Speed Demon', icon: '⚡', description: 'Completed challenge in record time' },
    { name: 'Perfect Score', icon: '💯', description: 'Achieved maximum points on a challenge' },
    { name: 'Team Player', icon: '🤝', description: 'Excellent collaboration' },
    { name: 'Innovator', icon: '💡', description: 'Creative solution approach' },
    { name: 'Champion', icon: '👑', description: 'Top performer overall' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bordeaux"></div>
      </div>
    );
  }

  const teamsWithStats = teams.map((team) => ({
    ...team,
    ...getTeamStats(team.id),
  })).sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-bordeaux mb-8">Gamification & Achievements</h1>

      {/* Predefined Badges */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-slide-up">
        <h2 className="text-2xl font-bold text-bordeaux mb-6 flex items-center">
          <span className="mr-2">🏅</span>
          Available Badges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {predefinedBadges.map((badge, index) => (
            <div
              key={index}
              className="border-2 border-light-pink rounded-lg p-4 hover:border-bordeaux transition-all duration-200 transform hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <h3 className="font-bold text-lg text-bordeaux mb-1">{badge.name}</h3>
              <p className="text-gray-600 text-sm">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Achievements */}
      <div className="bg-white rounded-xl shadow-md p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-bold text-bordeaux mb-6 flex items-center">
          <span className="mr-2">🎮</span>
          Team Achievements
        </h2>
        {teamsWithStats.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No teams registered yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {teamsWithStats.map((team, index) => (
              <div
                key={team.id}
                className="border-2 border-gray-200 rounded-lg p-6 hover:border-bordeaux transition-all duration-200 animate-slide-up"
                style={{
                  animationDelay: `${0.4 + index * 0.05}s`,
                  borderLeft: `6px solid ${team.color}`,
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: team.color }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-bordeaux">{team.name}</h3>
                        <p className="text-gray-600 text-sm">{team.members}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="bg-dark-orange text-white px-4 py-2 rounded-lg">
                        <span className="text-2xl font-bold">{team.totalPoints}</span>
                        <span className="text-sm ml-1">points</span>
                      </div>
                      <div className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                        <span className="text-lg font-bold">{team.scoreCount}</span>
                        <span className="text-sm ml-1">scores</span>
                      </div>
                    </div>
                    {team.badges.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Earned Badges:</p>
                        <div className="flex flex-wrap gap-2">
                          {team.badges.map((badge, badgeIndex) => (
                            <span
                              key={badgeIndex}
                              className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold animate-bounce-subtle"
                              style={{ animationDelay: `${badgeIndex * 0.1}s` }}
                            >
                              🏅 {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gamification;

