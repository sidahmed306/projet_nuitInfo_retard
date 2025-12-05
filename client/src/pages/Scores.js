import React, { useState, useEffect } from 'react';
import { scoresAPI, teamsAPI, challengesAPI } from '../services/api';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

const Scores = () => {
  const [scores, setScores] = useState([]);
  const [teams, setTeams] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScore, setEditingScore] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
  });
  const [filterTeam, setFilterTeam] = useState('');
  const [filterChallenge, setFilterChallenge] = useState('');
  const [sortBy, setSortBy] = useState('points');
  const [sortOrder, setSortOrder] = useState('desc');
  const [formData, setFormData] = useState({
    teamId: '',
    challengeId: '',
    points: '',
    badge: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [scoresRes, teamsRes, challengesRes] = await Promise.all([
        scoresAPI.getAll(),
        teamsAPI.getAll(),
        challengesAPI.getAll(),
      ]);
      setScores(scoresRes.data);
      setTeams(teamsRes.data);
      setChallenges(challengesRes.data);
    } catch (error) {
      showToast('Error loading data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingScore) {
        await scoresAPI.update(editingScore.id, formData);
        showToast('Score updated successfully!');
      } else {
        await scoresAPI.create(formData);
        showToast('Score created successfully!');
      }
      fetchData();
      handleCloseModal();
    } catch (error) {
      showToast('Error saving score', 'error');
    }
  };

  const handleEdit = (score) => {
    setEditingScore(score);
    setFormData({
      teamId: score.teamId,
      challengeId: score.challengeId,
      points: score.points,
      badge: score.badge || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Score',
      message: 'Are you sure you want to delete this score?',
      onConfirm: async () => {
        try {
          await scoresAPI.delete(id);
          showToast('Score deleted successfully!');
          fetchData();
        } catch (error) {
          showToast('Error deleting score', 'error');
        }
      },
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingScore(null);
    setFormData({ teamId: '', challengeId: '', points: '', badge: '' });
  };

  const handleAddNew = () => {
    setEditingScore(null);
    setFormData({ teamId: '', challengeId: '', points: '', badge: '' });
    setIsModalOpen(true);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedScores = scores
    .filter((score) => {
      if (filterTeam && score.teamId !== filterTeam) return false;
      if (filterChallenge && score.challengeId !== filterChallenge) return false;
      return true;
    })
    .sort((a, b) => {
      let aVal, bVal;
      if (sortBy === 'points') {
        aVal = a.points;
        bVal = b.points;
      } else if (sortBy === 'team') {
        aVal = a.teamName;
        bVal = b.teamName;
      } else if (sortBy === 'challenge') {
        aVal = a.challengeName;
        bVal = b.challengeName;
      }
      return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bordeaux"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-bordeaux">Scores Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-gradient-to-r from-bordeaux to-dark-orange text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          + Add New Score
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 animate-slide-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Team
            </label>
            <select
              value={filterTeam}
              onChange={(e) => setFilterTeam(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux focus:border-transparent"
            >
              <option value="">All Teams</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Challenge
            </label>
            <select
              value={filterChallenge}
              onChange={(e) => setFilterChallenge(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux focus:border-transparent"
            >
              <option value="">All Challenges</option>
              {challenges.map((challenge) => (
                <option key={challenge.id} value={challenge.id}>
                  {challenge.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setFilterTeam('');
                setFilterChallenge('');
              }}
              className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {filteredAndSortedScores.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center animate-slide-up">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No Scores Yet</h2>
          <p className="text-gray-500 mb-6">Record your first score to get started!</p>
          <button
            onClick={handleAddNew}
            className="bg-bordeaux text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Record Score
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bordeaux text-white">
                <tr>
                  <th
                    className="px-6 py-4 text-left cursor-pointer hover:bg-opacity-90 transition-colors"
                    onClick={() => handleSort('team')}
                  >
                    Team {sortBy === 'team' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-4 text-left cursor-pointer hover:bg-opacity-90 transition-colors"
                    onClick={() => handleSort('challenge')}
                  >
                    Challenge {sortBy === 'challenge' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-4 text-left cursor-pointer hover:bg-opacity-90 transition-colors"
                    onClick={() => handleSort('points')}
                  >
                    Points {sortBy === 'points' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-4 text-left">Badge</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedScores.map((score, index) => {
                  const team = teams.find((t) => t.id === score.teamId);
                  return (
                    <tr
                      key={score.id}
                      className="border-b border-gray-200 hover:bg-light-gray transition-colors animate-slide-up"
                      style={{ animationDelay: `${index * 0.02}s` }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          {team && (
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: team.color }}
                            ></div>
                          )}
                          <span className="font-semibold">{score.teamName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{score.challengeName}</td>
                      <td className="px-6 py-4">
                        <span className="text-xl font-bold text-dark-orange">
                          {score.points}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {score.badge ? (
                          <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                            🏅 {score.badge}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(score)}
                            className="bg-bordeaux text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors text-sm font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(score.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingScore ? 'Edit Score' : 'Record New Score'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Team *
            </label>
            <select
              required
              value={formData.teamId}
              onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux focus:border-transparent"
            >
              <option value="">Select a team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Challenge *
            </label>
            <select
              required
              value={formData.challengeId}
              onChange={(e) => setFormData({ ...formData, challengeId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux focus:border-transparent"
            >
              <option value="">Select a challenge</option>
              {challenges.map((challenge) => (
                <option key={challenge.id} value={challenge.id}>
                  {challenge.name} (Max: {challenge.maxPoints} pts)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Points *
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.points}
              onChange={(e) => setFormData({ ...formData, points: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux focus:border-transparent"
              placeholder="Enter points"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Badge (Optional)
            </label>
            <input
              type="text"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux focus:border-transparent"
              placeholder="e.g., First Place, Speed Demon"
            />
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-bordeaux to-dark-orange text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {editingScore ? 'Update Score' : 'Record Score'}
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm || (() => {})}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default Scores;

