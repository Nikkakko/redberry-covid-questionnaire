import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Doctor } from '../../assets/images';
import { YellowStar } from '../../assets/svgs';
import { setIsDisabled } from '../../features/questSlice';
import LeftArrow from '../../svg/LeftArrow';
import RightArrow from '../../svg/RightArrow';

type Props = {
  nextStep: () => void;
  prevStep: () => void;
};

const Vaccination = ({ nextStep, prevStep }: Props) => {
  const { isDisabled } = useAppSelector(state => state.quest);
  const dispatch = useAppDispatch();
  const [isVaccinated, setIsVaccinated] = useState<string | null>(null);
  const [isAntibodyTested, setIsAntibodyTested] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = useState<string | null>(null);

  const VaccinatedOptions = [
    {
      label: 'კი',
      value: 'კი',
    },
    {
      label: 'არა',
      value: 'არა',
    },
  ];

  const AntibodyTestedOptions = [
    {
      label: 'პირველი დოზა და დარეგისტრირებული ვარ მეორეზე',
      value: 'პირველი დოზა და დარეგისტრირებული ვარ მეორეზე',
      id: 1,
    },

    {
      label: 'სრულად აცრილი ვარ',
      value: 'სრულად აცრილი ვარ',
      id: 2,
    },

    {
      label: 'პირველი დოზა და არ დავრეგისტრირებულვარ მეორეზე',
      value: 'პირველი დოზა და არ დავრეგისტრირებულვარ მეორეზე',
      id: 3,
    },
  ];

  const WaitingOptions = [
    {
      id: 1,
      label: 'დარეგისტრირებული ვარ და ველოდები რიცხვს',
      value: 'დარეგისტრირებული ვარ და ველოდები რიცხვს',
    },

    {
      id: 2,
      label: 'არ ვგეგმავ',
      value: 'არ ვგეგმავ',
    },

    {
      id: 3,
      label: 'გადატანილი მაქვს და ვგეგმავ აცრას',
      value: 'გადატანილი მაქვს და ვგეგმავ აცრას',
    },
  ];

  const handleNext = () => {
    if (isVaccinated === 'არა' && isWaiting === 'არ ვგეგმავ') {
      nextStep();
    } else if (
      isWaiting === 'დარეგისტრირებული ვარ და ველოდები რიცხვს' ||
      isWaiting === 'გადატანილი მაქვს და ვგეგმავ აცრას'
    ) {
      nextStep();
    }

    switch (isVaccinated) {
      case 'კი':
        if (
          isAntibodyTested === 'პირველი დოზა და დარეგისტრირებული ვარ მეორეზე' ||
          isAntibodyTested === 'სრულად აცრილი ვარ'
        ) {
          nextStep();
        } else if (
          isAntibodyTested === 'პირველი დოზა და არ დავრეგისტრირებულვარ მეორეზე'
        ) {
          dispatch(setIsDisabled(true));
          return null;
        }
        break;
      case 'არა':
        if (isWaiting === 'არ ვგეგმავ') {
          nextStep();
        } else if (
          isWaiting === 'დარეგისტრირებული ვარ და ველოდები რიცხვს' ||
          isWaiting === 'გადატანილი მაქვს და ვგეგმავ აცრას'
        ) {
          nextStep();
        }
        break;
    }

    // set isVaccinated, isWaiting, isAntibodyTested to local storage
    localStorage.setItem('isVaccinated', isVaccinated as string);
    localStorage.setItem('isWaiting', isWaiting as string);
    localStorage.setItem('isAntibodyTested', isAntibodyTested as string);
  };

  useEffect(() => {
    dispatch(setIsDisabled(true));
  }, []);

  useEffect(() => {
    // get isVaccinated, isWaiting, isAntibodyTested from local storage
    const isVaccinated = localStorage.getItem('isVaccinated');
    const isWaiting = localStorage.getItem('isWaiting');
    const isAntibodyTested = localStorage.getItem('isAntibodyTested');

    if (isVaccinated) {
      setIsVaccinated(isVaccinated);
    }

    if (isWaiting) {
      setIsWaiting(isWaiting);
    }

    if (isAntibodyTested) {
      setIsAntibodyTested(isAntibodyTested);
    }
  }, []);

  useEffect(() => {
    if (isVaccinated === 'არა' && isWaiting === 'არ ვგეგმავ') {
      dispatch(setIsDisabled(false));
    } else if (
      isWaiting === 'დარეგისტრირებული ვარ და ველოდები რიცხვს' ||
      isWaiting === 'გადატანილი მაქვს და ვგეგმავ აცრას'
    ) {
      dispatch(setIsDisabled(false));
    }

    switch (isVaccinated) {
      case 'კი':
        if (
          isAntibodyTested === 'პირველი დოზა და დარეგისტრირებული ვარ მეორეზე' ||
          isAntibodyTested === 'სრულად აცრილი ვარ'
        ) {
          dispatch(setIsDisabled(false));
        } else if (
          isAntibodyTested === 'პირველი დოზა და არ დავრეგისტრირებულვარ მეორეზე'
        ) {
          dispatch(setIsDisabled(false));
        }
        break;
    }
  }, [isVaccinated, isAntibodyTested, isWaiting]);

  return (
    <Container>
      <FormGroup>
        <Label htmlFor='კი'>უკვე აცრილი ხარ?*</Label>
        {VaccinatedOptions.map((option, index) => (
          <InputGroup key={index}>
            <Input
              type='radio'
              value={option.value}
              checked={isVaccinated === option.value}
              onChange={e => setIsVaccinated(e.target.value)}
            />

            <Label>{option.label}</Label>
          </InputGroup>
        ))}
      </FormGroup>

      {isVaccinated === 'კი' && (
        <FormGroup>
          <Label htmlFor='კი'>აირჩიე რა ეტაპზე ხარ?*</Label>

          {AntibodyTestedOptions.map((option, index) => (
            <InputGroup key={index}>
              <Input
                type='radio'
                value={option.value}
                checked={isAntibodyTested === option.value}
                onChange={e => setIsAntibodyTested(e.target.value)}
              />
              <Label>{option.label}</Label>
            </InputGroup>
          ))}

          {isAntibodyTested ===
            'პირველი დოზა და არ დავრეგისტრირებულვარ მეორეზე' && (
            <>
              <SecondVaccine>
                <p>
                  რომ არ გადადო,
                  <br /> ბარემ ახალვე დარეგისტრიდი
                </p>
                <a href='https://booking.moh.gov.ge/' target='_blank'>
                  https://booking.moh.gov.ge/
                </a>
              </SecondVaccine>
            </>
          )}
        </FormGroup>
      )}

      {isVaccinated === 'არა' && (
        <FormGroup>
          <Label htmlFor='კი'>რას ელოდები?*</Label>
          {WaitingOptions.map((option, index) => (
            <InputGroup key={index}>
              <Input
                type='radio'
                value={option.value}
                checked={isWaiting === option.value}
                onChange={e => setIsWaiting(e.target.value)}
              />
              <Label>{option.label}</Label>
            </InputGroup>
          ))}

          {isWaiting === 'არ ვგეგმავ' && (
            <>
              <SecondVaccine>
                <a href='https://booking.moh.gov.ge/' target='_blank'>
                  👉 https://booking.moh.gov.ge/
                </a>
              </SecondVaccine>
            </>
          )}

          {isWaiting === 'გადატანილი მაქვს და ვგეგმავ აცრას' && (
            <>
              <SecondVaccine
                style={{
                  width: '85%',
                }}
              >
                <p>
                  ახალი პროტოკოლით კოვიდის გადატანიდან 1 თვის შემდეგ შეგიძლიათ
                  ვაქცინის გაკეთება.
                </p>
                <a
                  href='https://booking.moh.gov.ge/'
                  target='_blank'
                  style={{
                    marginTop: '20px',
                  }}
                >
                  👉 https://booking.moh.gov.ge/
                </a>
              </SecondVaccine>
            </>
          )}
        </FormGroup>
      )}

      <LogoContainer>
        <img src={Doctor} alt='vaccinate' />
        <YellowStarLogo />
        <Arrows>
          <LeftArrow onClick={prevStep} />
          <RightArrow onClick={handleNext} isDisabled={isDisabled} />
        </Arrows>
      </LogoContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 46px;
  width: 100%;
  height: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 198px;
  right: 197px;

  /* width: 90%; */
  /* height: 85%; */

  img {
    width: 80%;
    height: 80%;

    //prevent image from being dragged
    -webkit-user-drag: none;
    user-select: none;
  }
`;

const YellowStarLogo = styled.div`
  background: url(${YellowStar}) no-repeat center;
  background-size: contain;
  width: 288px;
  height: 312px;
  position: absolute;
  top: -30px;
  left: 0;
  z-index: -1;
`;

const Arrows = styled.div`
  display: flex;
  position: absolute;
  gap: 117px;
  bottom: -40px;
  left: -60px;
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%; ;
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 27px;
  font-feature-settings: 'cpsp' on;

  color: #232323;
`;

const Input = styled.input`
  width: 23px;
  height: 23px;

  // change radio button color
  & {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    border: 1px solid #232323;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;

    &:checked {
      &::after {
        content: '';
        display: block;
        width: 17px;
        height: 17px;
        border-radius: 50%;
        background: #232323;
        margin: 2px;
      }
    }
  }
`;

const InputGroup = styled.div`
  display: flex;
  gap: 19px;
  margin-top: 20px;
  margin-left: 11px;

  label {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    color: #232323;
  }
`;

const TextInput = styled.input`
  width: 513px;
  height: 50px;
  padding: 11px 20px;
  border: 0.8px solid #232323;
  &:first-of-type {
    margin-top: 29px;
  }
  margin-top: 25px;
  margin-left: 11px;

  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;

  &:focus {
    outline: none;
  }

  color: #232323;
`;

const Error = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  margin-left: 20px;
  margin-top: 5px;

  color: #f15524;
`;

const SecondVaccine = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 52px;
  margin-top: 39px;

  width: 100%;

  a {
    color: #1289ae;
    font-style: normal;
    text-decoration: none;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }
`;

export default Vaccination;
