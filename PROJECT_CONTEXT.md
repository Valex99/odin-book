# Odin Book Project Context

## Project Overview

- **Goal**: Learning full-stack development with modern technologies
- **Project**: Complete Twitter clone called "Odin Book"
- **Structure**: Monorepo with separate backend and frontend folders
- **Mentoring Approach**: Guide through learning, don't provide direct code solutions

## Core Features (Phase 1)

1. **User Management**: Follow/unfollow users, edit profiles, search users
2. **Tweet System**: Post, like, delete tweets
3. **Feed**: See tweets from followed users
4. **Search**: Search for users and tweets
5. **UI/UX**: Theme switching, tweet filtering
6. **Future**: Direct Messages (Phase 2)

## Tech Stack

### Backend

- **Runtime**: Node.js v22.11.0
- **Framework**: Express.js
- **ORM**: Prisma
- **Package Manager**: npm v11.1.0
- **Additional**: cors, dotenv, nodemon (dev)

### Frontend

- **Framework**: Next.js 15.5.4 with App Router
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Package Manager**: npm

## Project Structure

```
/odin-book/
├── backend/
│   ├── package.json (Express + Prisma setup)
│   ├── prisma/
│   │   └── schema.prisma
│   └── index.js (basic Express server)
└── frontend/
    ├── package.json (Next.js + Tailwind)
    └── src/app/ (Next.js app structure)
```

## Current Status

- ✅ Git initialized in root directory (monorepo setup)
- ✅ Backend: Express + Prisma installed and configured
- ✅ Frontend: Next.js with Tailwind CSS ready
- ✅ Basic Express server created
- ✅ Prisma initialized with default schema
- ✅ Signup form created with React Hook Form + Zod validation

## Mentoring Notes

- User prefers guidance over direct code solutions
- Focus on learning and understanding concepts
- Encourage exploration and problem-solving
- Ask questions to guide thinking process
- User decided: Start with frontend mobile design (homepage), then backend routing
