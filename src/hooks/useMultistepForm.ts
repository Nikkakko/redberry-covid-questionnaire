import { ReactElement, useState } from 'react';

export function useMultistepForm<T>(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function nextStep() {
    setCurrentStepIndex(prev => {
      if (prev >= steps.length - 1) {
        return prev;
      }
      return prev + 1;
    });
  }

  function previousStep() {
    setCurrentStepIndex(prev => {
      if (prev <= 0) {
        return prev;
      }
      return prev - 1;
    });
  }

  function goToStep(stepIndex: number) {
    setCurrentStepIndex(stepIndex);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    goToStep,
    nextStep,
    previousStep,
    steps,
    isFirstStep: currentStepIndex !== 0,
    isLastStep: currentStepIndex === steps.length - 1,
  };
}
