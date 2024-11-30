# Footprint - Corporate Journey Documentation Platform

Footprint is an enterprise platform that tracks and documents a company's journey through its development and growth. It preserves corporate history through interconnected stories and achievements, creating a living documentation of company culture and growth.

## 🌟 Features

### Currently Implemented

#### Memory Feed
- View chronological feed of company memories and achievements
- Create new memories with rich text content
- Add tags for categorization
- Set visibility levels (private, team, company, public)
- Support for multiple memory types:
  - Milestones
  - Achievements
  - Projects
  - Stories

#### Team Collaboration
- Team-specific memory sharing
- Comment system on memories
- Like and engagement tracking
- Activity feed for team updates

#### User Management
- User authentication and authorization
- Role-based access control
- Department-based organization
- User profiles with achievements

#### Analytics
- Department comparison metrics
- Engagement tracking
- Growth metrics visualization
- Team contribution insights

### 🚀 Roadmap

#### Phase 1: Enhanced Memory Creation (Q2 2024)
- [ ] Media upload support (images, videos, documents)
- [ ] Voice note recording
- [ ] Rich text editor integration
- [ ] Auto-save functionality
- [ ] Draft system for memories

#### Phase 2: Smart Features (Q3 2024)
- [ ] AI-powered "Story Suggestions"
- [ ] Calendar event integration
- [ ] Email thread analysis
- [ ] Project completion detection
- [ ] Automated milestone tracking

#### Phase 3: Team Features (Q3 2024)
- [ ] Team Pulse notifications
- [ ] Story Arc curation
- [ ] Impact Visualizer
- [ ] Legacy Moments nomination
- [ ] Team achievement tracking

#### Phase 4: Knowledge Management (Q4 2024)
- [ ] Heritage Hubs for departments
- [ ] Innovation Archive
- [ ] Giant's Journal
- [ ] Knowledge Navigator
- [ ] Search and discovery tools

#### Phase 5: Gamification (Q4 2024)
- [ ] Memory Maker badges
- [ ] Legacy Leader status
- [ ] History Hunter challenges
- [ ] Achievement system
- [ ] Contribution rewards

#### Phase 6: Integration & Export (Q1 2025)
- [ ] HR system integration
- [ ] Project management tool sync
- [ ] Travel system connection
- [ ] Communication platform integration
- [ ] Export capabilities for portfolios

## 🛠 Technical Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Charts**: Chart.js with react-chartjs-2

## 🏗 Architecture

### Core Modules

```
src/
├── components/
│   ├── achievements/    # Achievement-related components
│   ├── analytics/       # Analytics and metrics components
│   ├── collaboration/   # Team collaboration features
│   ├── comments/        # Comment system components
│   ├── group/          # Group management components
│   ├── impact/         # Impact tracking components
│   ├── knowledge/      # Knowledge base components
│   ├── language/       # Internationalization components
│   ├── layout/         # Layout and navigation components
│   ├── memory/         # Memory creation and display
│   ├── milestones/     # Milestone tracking components
│   ├── notifications/  # Notification system
│   ├── onboarding/     # User onboarding flow
│   ├── search/         # Search functionality
│   ├── settings/       # User and company settings
│   └── team/           # Team management components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── store/              # Zustand store modules
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🔄 Current User Flows

### Memory Creation
1. User clicks "Create Memory" button
2. Fills in memory details (title, content, type)
3. Adds tags for categorization
4. Sets visibility level
5. Optionally adds media (pending implementation)
6. Submits memory to feed

### Team Collaboration
1. Team members view shared memories
2. Can like and comment on memories
3. Filter memories by department or type
4. Track team engagement and activity

### Analytics View
1. Leaders access analytics dashboard
2. View department comparisons
3. Track engagement metrics
4. Monitor team contributions
5. Analyze growth trends

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/footprint.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
Create a `.env` file with required variables:
```
VITE_API_URL=your_api_url
VITE_AUTH_DOMAIN=your_auth_domain
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- All contributors and maintainers
- Open source libraries used in this project
- Community feedback and support