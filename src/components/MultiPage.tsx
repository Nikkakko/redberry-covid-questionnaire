import styled from 'styled-components';
import { useMultistepForm } from '../hooks/useMultistepForm';
import { Identification, Advice, Questionnaire, Vaccination } from './Question';
import { IdentificationLogo } from '../assets/images';
import Header from '../Layout/Header';

const MultiPage = () => {
  const { currentStepIndex, step, steps, nextStep, previousStep } =
    useMultistepForm([
      <Identification nextStep={() => nextStep()} />,
      <Questionnaire
        nextStep={() => nextStep()}
        prevStep={() => previousStep()}
      />,
      <Vaccination
        nextStep={() => nextStep()}
        prevStep={() => previousStep()}
      />,
      <Advice prevStep={() => previousStep()} />,
    ]);
  return (
    <Container>
      <Header currentStepIndex={currentStepIndex} steps={steps} />
      {step}
    </Container>
  );
};

const Container = styled.div``;

export default MultiPage;
