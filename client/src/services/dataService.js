import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'nuit-info-data';
const INITIAL_DATA = {
  teams: [],
  scores: [],
  challenges: []
};

// Load data from localStorage or initialize
function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Try to load from public/data.json on first load
    return INITIAL_DATA;
  } catch (error) {
    console.error('Error loading data:', error);
    return INITIAL_DATA;
  }
}

// Save data to localStorage
function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
}

// Get all data
function getAllData() {
  return loadData();
}

// Teams operations
export const teamsAPI = {
  getAll: async () => {
    const data = loadData();
    return { data: data.teams || [] };
  },
  getById: async (id) => {
    const data = loadData();
    const team = data.teams.find(t => t.id === id);
    if (!team) {
      throw new Error('Team not found');
    }
    return { data: team };
  },
  create: async (teamData) => {
    const data = loadData();
    const newTeam = {
      id: uuidv4(),
      ...teamData
    };
    data.teams.push(newTeam);
    saveData(data);
    return { data: newTeam };
  },
  update: async (id, teamData) => {
    const data = loadData();
    const teamIndex = data.teams.findIndex(t => t.id === id);
    if (teamIndex === -1) {
      throw new Error('Team not found');
    }
    data.teams[teamIndex] = { ...data.teams[teamIndex], ...teamData };
    saveData(data);
    return { data: data.teams[teamIndex] };
  },
  delete: async (id) => {
    const data = loadData();
    const teamIndex = data.teams.findIndex(t => t.id === id);
    if (teamIndex === -1) {
      throw new Error('Team not found');
    }
    // Also delete associated scores
    data.scores = data.scores.filter(s => s.teamId !== id);
    data.teams.splice(teamIndex, 1);
    saveData(data);
    return { data: { message: 'Team deleted successfully' } };
  }
};

// Scores operations
export const scoresAPI = {
  getAll: async () => {
    const data = loadData();
    const scores = data.scores || [];
    // Populate with team and challenge names
    const populatedScores = scores.map(score => {
      const team = data.teams.find(t => t.id === score.teamId);
      const challenge = data.challenges.find(c => c.id === score.challengeId);
      return {
        ...score,
        teamName: team?.name || 'Unknown',
        challengeName: challenge?.name || 'Unknown'
      };
    });
    return { data: populatedScores };
  },
  getById: async (id) => {
    const data = loadData();
    const score = data.scores.find(s => s.id === id);
    if (!score) {
      throw new Error('Score not found');
    }
    return { data: score };
  },
  create: async (scoreData) => {
    const data = loadData();
    const newScore = {
      id: uuidv4(),
      teamId: scoreData.teamId,
      challengeId: scoreData.challengeId,
      points: Number(scoreData.points),
      badge: scoreData.badge || null
    };
    data.scores.push(newScore);
    saveData(data);
    return { data: newScore };
  },
  update: async (id, scoreData) => {
    const data = loadData();
    const scoreIndex = data.scores.findIndex(s => s.id === id);
    if (scoreIndex === -1) {
      throw new Error('Score not found');
    }
    data.scores[scoreIndex] = {
      ...data.scores[scoreIndex],
      teamId: scoreData.teamId,
      challengeId: scoreData.challengeId,
      points: Number(scoreData.points),
      badge: scoreData.badge || null
    };
    saveData(data);
    return { data: data.scores[scoreIndex] };
  },
  delete: async (id) => {
    const data = loadData();
    const scoreIndex = data.scores.findIndex(s => s.id === id);
    if (scoreIndex === -1) {
      throw new Error('Score not found');
    }
    data.scores.splice(scoreIndex, 1);
    saveData(data);
    return { data: { message: 'Score deleted successfully' } };
  }
};

// Challenges operations
export const challengesAPI = {
  getAll: async () => {
    const data = loadData();
    return { data: data.challenges || [] };
  },
  getById: async (id) => {
    const data = loadData();
    const challenge = data.challenges.find(c => c.id === id);
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    return { data: challenge };
  },
  create: async (challengeData) => {
    const data = loadData();
    const newChallenge = {
      id: uuidv4(),
      name: challengeData.name,
      description: challengeData.description,
      maxPoints: Number(challengeData.maxPoints)
    };
    data.challenges.push(newChallenge);
    saveData(data);
    return { data: newChallenge };
  },
  update: async (id, challengeData) => {
    const data = loadData();
    const challengeIndex = data.challenges.findIndex(c => c.id === id);
    if (challengeIndex === -1) {
      throw new Error('Challenge not found');
    }
    data.challenges[challengeIndex] = {
      ...data.challenges[challengeIndex],
      name: challengeData.name,
      description: challengeData.description,
      maxPoints: Number(challengeData.maxPoints)
    };
    saveData(data);
    return { data: data.challenges[challengeIndex] };
  },
  delete: async (id) => {
    const data = loadData();
    const challengeIndex = data.challenges.findIndex(c => c.id === id);
    if (challengeIndex === -1) {
      throw new Error('Challenge not found');
    }
    // Also delete associated scores
    data.scores = data.scores.filter(s => s.challengeId !== id);
    data.challenges.splice(challengeIndex, 1);
    saveData(data);
    return { data: { message: 'Challenge deleted successfully' } };
  }
};

// Dashboard operations
export const dashboardAPI = {
  getStats: async () => {
    const data = loadData();
    const teams = data.teams || [];
    const challenges = data.challenges || [];
    const scores = data.scores || [];
    
    // Calculate team totals
    const teamTotals = teams.map(team => {
      const teamScores = scores.filter(s => s.teamId === team.id);
      const totalPoints = teamScores.reduce((sum, s) => sum + s.points, 0);
      return {
        ...team,
        totalPoints
      };
    }).sort((a, b) => b.totalPoints - a.totalPoints);
    
    return {
      data: {
        totalTeams: teams.length,
        totalChallenges: challenges.length,
        totalScores: scores.length,
        topTeams: teamTotals.slice(0, 3)
      }
    };
  }
};

// Export function to reset data
export const resetData = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Export function to export data as JSON
export const exportData = () => {
  const data = loadData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nuit-info-data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Export function to import data from JSON
export const importData = (jsonData) => {
  try {
    const data = JSON.parse(jsonData);
    if (data.teams && data.scores && data.challenges) {
      saveData(data);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};

export default {
  teamsAPI,
  scoresAPI,
  challengesAPI,
  dashboardAPI,
  resetData,
  exportData,
  importData
};

