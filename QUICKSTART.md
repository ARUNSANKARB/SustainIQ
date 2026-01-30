# Quick Start Guide

## 1. Install Backend Dependencies

```bash
cd backend
npm install
```

## 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

## 3. Start Backend

In a terminal, from the `backend` directory:

```bash
npm start
```

Backend will run on `http://localhost:4000`

## 4. Start Frontend

In another terminal, from the `frontend` directory:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 5. Open in Browser

Navigate to: `http://localhost:5173`

You should see the SustainIQ quiz platform.

## Optional: Use Grok API

To use actual AI explanations from Grok:

1. Create a `.env` file in the `backend` directory
2. Add your API key:
   ```
   GROK_API_KEY=your_key_here
   GROK_API_URL=https://api.grok.ai/v1
   ```
3. Restart the backend

If no API key is provided, fallback explanations are used automatically.
