import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export const QuizProvider = ({ children }) => {
  const [quizData, setQuizData] = useState({
    // Quiz1 data
    pet: '',
    lifeStage: '',
    weight: '',
    
    // Quiz2 data
    avoidIngredients: [],
    feedingStyle: '',
    
    // Quiz3 data
    priorities: [],
    mainGoal: '',
    
    // Quiz4 data
    budget: '',
    organicPremium: '',
    preferredBuying: '',
    
    // Quiz5 data
    alternativeProteins: '',
    organicExperience: '',
    zipCode: ''
  });

  const updateQuizData = (step, data) => {
    setQuizData(prev => ({
      ...prev,
      ...data
    }));
  };

  const resetQuizData = () => {
    setQuizData({
      pet: '',
      lifeStage: '',
      weight: '',
      avoidIngredients: [],
      feedingStyle: '',
      priorities: [],
      mainGoal: '',
      budget: '',
      organicPremium: '',
      preferredBuying: '',
      alternativeProteins: '',
      organicExperience: '',
      zipCode: ''
    });
  };

  return (
    <QuizContext.Provider value={{
      quizData,
      updateQuizData,
      resetQuizData
    }}>
      {children}
    </QuizContext.Provider>
  );
};
