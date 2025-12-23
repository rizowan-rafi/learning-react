# React Tic-Tac-Toe (Time Travel Edition)

A fully functional, interactive Tic-Tac-Toe game built with **React** and **Tailwind CSS**. This project features a **Time Travel** mechanic, allowing players to jump back to any previous move in the game's history, and optionally play against an AI.

---

## ✨ Features

- **Two Game Modes**:  
  - **Two-Player Mode**: Human vs Human  
  - **AI Mode**: Human (X) vs AI (O) with thinking delay
- **Turn-Based Gameplay**: Automatic switching between X and O
- **Game Status**: Real-time status indicator for next player, winner, or draw
- **Time Travel (History)**: Sidebar records every move. Click a move to jump back
- **AI Thinking Simulation**: Shows “AI is thinking…” before AI moves
- **Interactive UI**: Clean, responsive layout with hover effects
- **Immutable State**: Built using React best practices for state and history management

---

## 🛠️ Tech Stack

- **React**: Hooks, Functional Components  
- **Tailwind CSS**: Utility-first styling  
- **JavaScript (ES6+)**

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine  
- React project setup (Vite or Create React App)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/rizowan-rafi/learning-react.git
cd Module\ 1/Tic-Tac-Toe
```
2. **Install dependencies:**
```bash
npm install
```
3. **Run the development server:**
```bash
npm run dev
```

### 🎮 How to Play

1. Select a game mode: Two Player or vs AI
2. Click on any empty square to make a move
3. Players alternate between X and O
4. The game announces:
    1. Winner if three symbols align
    2. Draw if all squares are filled without a winner
5. Use the move history panel to jump back to any previous move
6. In AI mode, watch the AI “thinking…” indicator before it makes its move
7. Click Restart Game anytime to start over