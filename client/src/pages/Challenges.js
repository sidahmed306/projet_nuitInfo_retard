import React, { useState, useEffect } from 'react';
import { challengesAPI } from '../services/api';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
  });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    maxPoints: '',
  });

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await challengesAPI.getAll();
      setChallenges(response.data);
    } catch (error) {
      showToast('Error loading challenges', 'error');
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
      if (editingChallenge) {
        await challengesAPI.update(editingChallenge.id, formData);
        showToast('Challenge updated successfully!');
      } else {
        await challengesAPI.create(formData);
        showToast('Challenge created successfully!');
      }
      fetchChallenges();
      handleCloseModal();
    } catch (error) {
      showToast('Error saving challenge', 'error');
    }
  };

  const handleEdit = (challenge) => {
    setEditingChallenge(challenge);
    setFormData({
      name: challenge.name,
      description: challenge.description,
      maxPoints: challenge.maxPoints,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Challenge',
      message: 'Are you sure you want to delete this challenge? All associated scores will also be deleted.',
      onConfirm: async () => {
        try {
          await challengesAPI.delete(id);
          showToast('Challenge deleted successfully!');
          fetchChallenges();
        } catch (error) {
          showToast('Error deleting challenge', 'error');
        }
      },
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingChallenge(null);
    setFormData({ name: '', description: '', maxPoints: '' });
  };

  const handleAddNew = () => {
    setEditingChallenge(null);
    setFormData({ name: '', description: '', maxPoints: '' });
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
        <h1 className="text-4xl font-bold text-bordeaux">Challenges Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-gradient-to-r from-bordeaux to-dark-orange text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          + Create Challenge
        </button>
      </div>

      {challenges.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center animate-slide-up">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No Challenges Yet</h2>
          <p className="text-gray-500 mb-6">Create your first challenge to get started!</p>
          <button
            onClick={handleAddNew}
            className="bg-bordeaux text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Create Challenge
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <div
              key={challenge.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-bordeaux mb-2">{challenge.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {challenge.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className="bg-dark-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Max: {challenge.maxPoints} pts
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(challenge)}
                  className="flex-1 bg-bordeaux text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(challenge.id)}
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
        title={editingChallenge ? 'Edit Challenge' : 'Create New Challenge'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Challenge Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux focus:border-transparent"
              placeholder="Enter challenge name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux focus:border-transparent"
              rows="4"
              placeholder="Enter challenge description"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Maximum Points *
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.maxPoints}
              onChange={(e) => setFormData({ ...formData, maxPoints: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bordeaux focus:border-transparent"
              placeholder="Enter maximum points"
            />
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-bordeaux to-dark-orange text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              {editingChallenge ? 'Update Challenge' : 'Create Challenge'}
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

export default Challenges;

