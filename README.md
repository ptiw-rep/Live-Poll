# Live Polling App

A real-time polling application built with React, Express, and Server-Sent Events (SSE). Users can create polls, vote on options, and see results update in real-time.

## Features

- ✨ Create polls with multiple options
- 🔄 Real-time updates using Server-Sent Events
- 📊 Live vote counting and percentage calculation
- 🎨 Clean and responsive UI with Tailwind CSS
- 🛡️ Error boundary for graceful error handling
- 🔄 Automatic reconnection for SSE
- 📱 Mobile-friendly design

## Project Structure

```
├── server/
│   ├── routes.js    # API route handlers
│   ├── store.js     # Data store management
│   └── sse.js       # Server-Sent Events handling
├── src/
│   ├── components/  # React components
│   ├── utils/       # Utility functions
│   └── types/       # TypeScript types
└── server.js        # Express server setup
```

### Key Components

- **CreatePoll**: Poll creation form with dynamic option fields
- **PollList**: Displays active polls with real-time vote updates
- **ErrorBoundary**: Handles runtime errors gracefully
- **LoadingSpinner**: Loading state indicator

### Server Components

- **routes.js**: API endpoints for poll operations
- **store.js**: In-memory data store for polls
- **sse.js**: SSE client management and broadcasting

## Technical Details

### Frontend

- React with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Server-Sent Events for real-time updates

### Backend

- Express.js server
- In-memory data store
- SSE for real-time communication
- CORS enabled for development

## API Endpoints

- `GET /polls`: Retrieve all polls
- `POST /polls`: Create a new poll
- `POST /vote/:optionId`: Vote on a poll option
- `GET /events`: SSE endpoint for real-time updates

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

   This will start both the Express server and Vite development server concurrently.

## Development

The project uses several development tools:

- **TypeScript** for type safety
- **ESLint** for code linting
- **Vite** for fast development and building
- **Concurrently** to run multiple servers

## Error Handling

- Frontend error boundary catches and displays runtime errors
- API requests include automatic retry logic
- SSE connection automatically attempts to reconnect on failure

## Real-time Updates

The application uses Server-Sent Events for real-time updates:

1. Client establishes SSE connection
2. Server maintains list of connected clients
3. On poll updates, server broadcasts to all clients
4. Clients automatically update UI with new data

## Best Practices

- Modular code structure
- TypeScript for type safety
- Error boundaries for resilience
- Automatic retry logic for API calls
- Real-time updates with SSE
- Responsive design with Tailwind CSS

## Environment Variables

- `VITE_API_URL`: API base URL (defaults to http://localhost:3001)

## License

MIT# Live-Poll
