import React, { useState, useEffect } from 'react';
import { teamsAPI } from '../services/api';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
  });
  const [formData, setFormData] = useState({
    name: '',
    members: '',
    color: '#7A1027',
  });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await teamsAPI.getAll();
      setTeams(response.data);
    } catch (error) {
      showToast('Error loading teams', 'error');
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
      if (editingTeam) {
        await teamsAPI.update(editingTeam.id, formData);
        showToast('Team updated successfully!');
      } else {
        await teamsAPI.create(formData);
        showToast('Team created successfully!');
      }
      fetchTeams();
      handleCloseModal();
    } catch (error) {
      showToast('Error saving team', 'error');
    }
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setFormData({
      name: team.name,
      members: team.members,
      color: team.color,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Team',
      message: 'Are you sure you want to delete this team? All associated scores will also be deleted.',
      onConfirm: async () => {
        try {
          await teamsAPI.delete(id);
          showToast('Team deleted successfully!');
          fetchTeams();
        } catch (error) {
          showToast('Error deleting team', 'error');
        }
      },
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTeam(null);
    setFormData({ name: '', members: '', color: '#7A1027' });
  };

  const handleAddNew = () => {
    setEditingTeam(null);
    setFormData({ name: '', members: '', color: '#7A1027' });
    setIsModalOpen(true);
  };

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
        <h1 className="text-4xl font-bold text-bordeaux">Teams Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-gradient-to-r from-bordeaux to-dark-orange text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 animate-bounce-subtle"
        >
          + Add New Team
        </button>
      </div>

      {teams.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center animate-slide-up">
          <div className="text-6xl mb-4">👥</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No Teams Yet</h2>
          <p className="text-gray-500 mb-6">Create your first team to get started!</p>
          <button
            onClick={handleAddNew}
            className="bg-bordeaux text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Create Team
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => (
            <div
              key={team.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up"
              style={{
                animationDelay: `${index * 0.05}s`,
                borderTop: `4px solid ${team.color}`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-bordeaux mb-2">{team.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{team.members}</p>
                </div>
                <div
                  className="w-12 h-12 rounded-full flex-shrink-0"
                  style={{ backgroundColor: team.color }}
                ></div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(team)}
                  className="flex-1 bg-bordeaux text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(team.id)}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTeam ? 'Edit Team' : 'Create New Team'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Team Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux focus:border-transparent"
              placeholder="Enter team name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Members *
            </label>
            <input
              type="text"
              required
              value={formData.members}
              onChange={(e) => setFormData({ ...formData, members: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux focus:border-transparent"
              placeholder="Enter team members (comma separated)"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Team Color *
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-20 h-12 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux focus:border-transparent"
                placeholder="#7A1027"
              />
            </div>
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-bordeaux to-dark-orange text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {editingTeam ? 'Update Team' : 'Create Team'}
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

export default Teams;

