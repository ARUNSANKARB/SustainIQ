import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export async function fetchNewQuiz(){
  const resp = await axios.get(`${API_BASE}/quiz/new`)
  return resp.data
}

export async function submitAnswers(sessionId, answers){
  const resp = await axios.post(`${API_BASE}/quiz/submit`, { sessionId, answers })
  return resp.data
}
