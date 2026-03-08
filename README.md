# UNC CodeArena (LeetCode-esque for University of Nueva Caceres)

A full-stack starter project using **Express.js + React.js** with:
- Teacher and student demo accounts
- Teacher dashboard for class-wide progress and grade estimates
- Student dashboard for personal progress and recommended problems
- Java code execution endpoint powered by a Dockerized runner

## Tech Stack
- Frontend: React + Vite
- Backend: Express.js
- Compiler runner: Docker container with JDK 21

## Demo Accounts
- `reyes` → teacher
- `alyssa`, `marco`, `lianne` → students

## Run with Docker Compose
```bash
docker compose up --build
```

- Client: http://localhost:5173
- API: http://localhost:4000/api/health

## Run without compose

### 1) Build Java runner image
```bash
docker build -t unc-java-runner:latest docker/java-runner
```

### 2) Run server
```bash
cd server
npm install
npm run dev
```

### 3) Run client
```bash
cd client
npm install
npm run dev
```

## API Endpoints
- `POST /api/auth/login`
- `GET /api/teacher/:teacherId/dashboard`
- `GET /api/student/:studentId/dashboard`
- `POST /api/compiler/java`

`/api/compiler/java` accepts:
```json
{
  "sourceCode": "public class Main { ... }",
  "stdinInput": "5 7"
}
```
