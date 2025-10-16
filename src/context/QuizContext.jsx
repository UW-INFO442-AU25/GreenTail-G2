import { createContext, useContext, useMemo, useReducer } from 'react';

const QuizContext = createContext();

const initialState = {
  petType: 'cat',
  dietaryRestrictions: [],
  ecoPriority: 'balanced',
  completed: false,
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'SET_PET_TYPE':
      return { ...state, petType: action.payload };
    case 'SET_DIETARY_RESTRICTIONS':
      return { ...state, dietaryRestrictions: action.payload };
    case 'SET_ECO_PRIORITY':
      return { ...state, ecoPriority: action.payload };
    case 'COMPLETE_QUIZ':
      return { ...state, completed: true };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
