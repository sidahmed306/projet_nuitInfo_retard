# Nuit de l'Info Gamification Tool

A comprehensive web application for managing and enhancing the competitive experience of the Nuit de l'Info coding competition.

## Features

- 📊 **Dashboard**: Overview of competition status with statistics and leaderboard
- 👥 **Teams Management**: Create, edit, and manage competition teams
- 🏆 **Scores Management**: Record and track scores for teams across challenges
- 🎯 **Challenges Management**: Define and manage competition challenges
- 🎮 **Gamification**: Badge system and achievements tracking
- 💾 **Local Storage**: All data persisted in browser localStorage
- 📥 **Export/Import**: Export and import data as JSON files

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Data Storage**: Browser localStorage with JSON structure
- **Routing**: React Router
- **UUID**: For generating unique IDs

## Installation

1. Install all dependencies:
```bash
npm run install-all
```

Or install client dependencies only:
```bash
cd client && npm install
```

2. Start the development server:
```bash
npm start
```

Or:
```bash
cd client && npm start
```

## Usage

- Frontend runs on: `http://localhost:4000`
- All data is stored in browser localStorage
- Initial data structure is in `client/public/data.json`

## Project Structure

```
nuitInfo/
├── client/
│   ├── public/
│   │   ├── data.json        # Initial data structure
│   │   └── index.html
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── Modal.js
│   │   │   └── Toast.js
│   │   ├── pages/           # Page components
│   │   │   ├── Dashboard.js
│   │   │   ├── Teams.js
│   │   │   ├── Scores.js
│   │   │   ├── Challenges.js
│   │   │   └── Gamification.js
│   │   ├── services/        # Data service layer
│   │   │   ├── api.js       # API compatibility layer
│   │   │   └── dataService.js  # Local storage CRUD operations
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── package.json
```

## Data Management

### Storage
- All data is stored in browser **localStorage** under the key `nuit-info-data`
- Data persists across browser sessions
- Initial empty structure: `{ teams: [], scores: [], challenges: [] }`

### CRUD Operations
All CRUD operations are performed locally:
- **Create**: Add new items to localStorage
- **Read**: Load data from localStorage
- **Update**: Modify existing items in localStorage
- **Delete**: Remove items from localStorage

### Data Export/Import
The application includes functions to:
- **Export**: Download current data as JSON file
- **Import**: Load data from JSON file
- **Reset**: Clear all stored data

## Data Structure

### Teams
```json
{
  "id": "uuid",
  "name": "string",
  "members": "string",
  "color": "hex color code"
}
```

### Scores
```json
{
  "id": "uuid",
  "teamId": "string",
  "challengeId": "string",
  "points": "number",
  "badge": "string (optional)"
}
```

### Challenges
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "maxPoints": "number"
}
```

## Color Scheme

- Primary: Bordeaux (#7A1027)
- Secondary: Dark Orange (#E2761B)
- Accent: Light Pink (#D9A8B4)
- Background: Light Gray (#F2F2F2)

## Browser Compatibility

- Modern browsers with localStorage support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers supported

## Notes

- Data is stored locally in your browser
- Clearing browser data will remove all stored information
- Use export/import functions to backup your data
- Each browser has its own separate data storage

## License

MIT
