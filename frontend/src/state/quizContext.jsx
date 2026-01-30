import React, { createContext, useReducer, useContext } from 'react'

const QuizStateContext = createContext()
const QuizDispatchContext = createContext()

const initialState = {
  sessionId: null,
  questions: [],
  answers: [],
  current: 0,
  result: null,
  explanations: []
}

function reducer(state, action){
  switch(action.type){
    case 'SET_QUIZ':
      return { ...state, sessionId: action.payload.sessionId, questions: action.payload.questions, answers: new Array(action.payload.questions.length).fill(null), current: 0, result: null, explanations: [] }
    case 'SELECT_ANSWER': {
      const answers = [...state.answers]
      answers[action.payload.index] = { questionId: action.payload.questionId, selectedOptionId: action.payload.optionId }
      return { ...state, answers }
    }
    case 'GO_NEXT':
      return { ...state, current: Math.min(state.questions.length - 1, state.current + 1) }
    case 'GO_PREV':
      return { ...state, current: Math.max(0, state.current - 1) }
    case 'SET_RESULT':
      return { ...state, result: action.payload }
    case 'SET_EXPLANATIONS':
      return { ...state, explanations: action.payload }
    default:
      return state
  }
}

export function QuizProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <QuizStateContext.Provider value={state}>
      <QuizDispatchContext.Provider value={dispatch}>
        {children}
      </QuizDispatchContext.Provider>
    </QuizStateContext.Provider>
  )
}

export function useQuizState(){ return useContext(QuizStateContext) }
export function useQuizDispatch(){ return useContext(QuizDispatchContext) }
