# Project Live Score

A modern, real-time sports statistics and scoring platform built with React and TypeScript. This application provides live game updates, player statistics, and an interactive user interface for multiple professional sports leagues.

## Features

### Comprehensive Sports Coverage
- **NFL**: Real-time player statistics, game leaders, and play-by-play analysis
- **NBA**: Player statistics and game highlights (In Development)
- **NHL**: Goals, assists, and game statistics (In Development)
- **MLB**: Comprehensive baseball statistics (In Development)

### Core Functionality
- Real-time score updates and game tracking
- Live player statistics with quarter/period updates
- Dynamic stat ticker with scrolling updates
- Team-specific theming and color schemes
- Responsive design for all devices

### Technical Highlights
- Built on React 18 with TypeScript
- Modern, responsive UI using TailwindCSS
- Real-time data integration with ESPN API
- Component-based architecture for easy customization
- Efficient state management and data flow

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/project-live-score.git
cd project-live-score
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start development server
```bash
npm run dev
```

## Implementation

### Basic Usage
```typescript
import { ScoreCard } from './components/ScoreCard';

function App() {
  return (
    <ScoreCard
      id="401547665"
      homeTeam={homeTeam}
      awayTeam={awayTeam}
      sport="NFL"
    />
  );
}
```

### Available Components

#### ScoreCard
The primary component for displaying game information:
```typescript
interface ScoreCardProps {
  id: string;          // ESPN game ID
  homeTeam: TeamInfo;  // Home team data
  awayTeam: TeamInfo;  // Away team data
  sport: 'NFL' | 'NBA' | 'NHL' | 'MLB';
}
```

#### Sport-Specific Tickers
Specialized components for each sport's statistics:
- `NFLTicker`: Comprehensive NFL statistics
- `NBATicker`: Basketball statistics (In Development)
- `NHLTicker`: Hockey statistics (In Development)
- `MLBTicker`: Baseball statistics (In Development)

## Development

### Project Structure
```
src/
├── components/     # React components
├── types/         # TypeScript definitions
├── utils/         # Utility functions
├── hooks/         # Custom React hooks
└── context/       # React context providers
```

### Contributing
1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes
4. Push to your branch
5. Submit a pull request

## Testing

Run the test suite:
```bash
npm run test
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- ESPN API for providing comprehensive sports data
- React and TypeScript communities
- Contributors and maintainers

## Roadmap

### Upcoming Features
- Enhanced player statistics
- Advanced game analytics
- Predictive modeling
- Additional sports leagues
- Performance optimizations

### Version 2.0 Goals
- WebSocket integration
- Custom analytics dashboard
- Mobile applications
- API documentation

---

For support, feature requests, or bug reports, please open an issue in the repository.