# RecruitmentPlus CRM

A comprehensive recruitment management system built with Next.js 15 and React 19, designed to streamline the recruitment workflow for hiring teams.

## Project Overview

RecruitmentPlus CRM is a full-featured recruitment management platform that helps recruitment agencies and HR teams manage:

- Candidates and applicant tracking
- Client companies and job openings
- Team collaboration tools
- Recruitment calendar and scheduling
- Automation workflows
- Analytics and reporting
- AI assistant for recruitment tasks

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router and Turbopack
- **UI**: React 19 with Tailwind CSS 4
- **Styling**: Tailwind CSS with HeadlessUI components
- **Language**: TypeScript
- **Authentication**: Custom auth implementation

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository
```bash
git clone git@github.com:Achref23illi/recrutmentplus_crm.git
cd recrutmentplus_crm
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                       # Next.js App Router structure
│   ├── (dashboard)/           # Dashboard wrapper layout
│   ├── ai-assistant/          # AI assistant feature
│   ├── analytics/             # Analytics and reporting
│   ├── auth/                  # Authentication pages and context
│   ├── automation/            # Workflow automation features
│   │   └── logs/              # Automation execution logs
│   ├── calendar/              # Recruitment calendar
│   ├── candidates/            # Candidate management
│   ├── companies/             # Client company management
│   ├── dashboard/             # Main dashboard
│   ├── settings/              # Application settings
│   └── team/                  # Team management
├── components/                # Shared React components
│   ├── ui/                    # UI components (cards, modals, etc.)
│   ├── Header.tsx             # Application header
│   └── Sidebar.tsx            # Navigation sidebar
├── lib/                       # Utility functions and shared code
├── public/                    # Static assets
├── next.config.ts             # Next.js configuration
└── package.json               # Project dependencies and scripts
```

## Key Features

- **Authentication System**: Secure login and user management
- **Candidate Management**: Track and manage applicants throughout the recruitment cycle
- **Company Management**: Manage client companies and their job openings
- **Team Collaboration**: Coordinate tasks among recruitment team members
- **Calendar Integration**: Schedule interviews and important recruitment events
- **Workflow Automation**: Create custom workflows to automate repetitive tasks
- **Analytics Dashboard**: Track key recruitment metrics and KPIs
- **AI Assistant**: Get help with recruitment tasks and candidate matching

## Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Development Guidelines

- The project follows a modular approach with feature-based organization
- Each major feature has its own directory under the `app` folder
- Shared UI components are stored in the `components/ui` directory
- Authentication is handled via the custom Auth Context (`app/auth/authContext.tsx`)
- All pages use the main layout (`app/layout.tsx`) except authentication pages which have their own layout

## Deployment

The application is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure environment variables as needed
4. Deploy

For other hosting options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [HeadlessUI Components](https://headlessui.dev)

## License

This project is proprietary software. All rights reserved.
