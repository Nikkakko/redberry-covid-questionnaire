import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Bike } from '../../assets/images';
import { HeartLogo } from '../../assets/svgs';
import LeftArrow from '../../svg/LeftArrow';
import Thanks from '../Thanks';

type Props = {
  prevStep: () => void;
};

const Advice = ({ prevStep }: Props) => {
  const [onlineMeeting, setOnlineMeeting] = useState<string | null>(null);
  const [officeValue, setOfficeValue] = useState<number | null>(null);
  const [meeting, setMeeting] = useState<string>('');
  const [opinion, setOpinion] = useState<string>('');
  const [isThanks, setIsThanks] = useState<boolean>(false);

  const OnlineMeetingOptions = [
    {
      label: 'კვირაში ორჯერ',
      value: 'კვირაში ორჯერ',
    },
    {
      label: 'კვირაში ერთხელ',
      value: 'კვირაში ერთხელ',
    },
    {
      label: 'ორ კვირაში ერთხელ',
      value: 'ორ კვირაში ერთხელ',
    },
    {
      label: 'თვეში ერთხელ',
      value: 'თვეში ერთხელ',
    },
  ];

  const OfficeValue = [0, 1, 2, 3, 4, 5] as number[];

  const handleSubmit = () => {
    if (onlineMeeting === null && officeValue === null) {
      return null;
    } else {
      setIsThanks(true);
    }
  };

  const handlePrevStep = () => {
    // set items to localStorage
    const data = {
      onlineMeeting,
      officeValue,
      meeting,
      opinion,
    };

    localStorage.setItem('advice', JSON.stringify(data));

    prevStep();
  };

  useEffect(() => {
    // get items from localStorage
    const data = localStorage.getItem('advice');

    if (data) {
      const parsedData = JSON.parse(data);
      setOnlineMeeting(parsedData.onlineMeeting);
      setOfficeValue(parsedData.officeValue);
      setMeeting(parsedData.meeting);
      setOpinion(parsedData.opinion);
    }
  }, []);
  return (
    <>
      {!isThanks && (
        <>
          <Container>
            <ContextWrapper>
              <HeadingText>
                რედბერის მთავარი ღირებულება ჩვენი გუნდის თითოეული წევრია.
                გარემო, რომელსაც ჩვენი თანამშრომლები ქმნით, ბევრისთვის არის და
                ყოფილა წლების განმავლობაში მიზნებისთვის ერთად ბრძოლის მიზეზი,
                ბევრისთვის კი — ჩვენთან გადმოსვლის. პანდემიის პერიოდში
                ერთმანეთსაც იშვიათად ვნახულობთ პირისპირ და ყოველდღიური
                კომუნიკაციაც გაიშვიათდა.
              </HeadingText>
              <FormGroup>
                <Label>
                  რა სიხშირით შეიძლება გვქონდეს საერთო არაფორმალური ონლაინ
                  შეხვედრები, სადაც ყველა სურვილისამებრ ჩაერთვება?*
                </Label>

                {OnlineMeetingOptions.map((option, index) => (
                  <InputGroup key={index}>
                    <Input
                      type='radio'
                      name='onlineMeeting'
                      value={option.value}
                      checked={onlineMeeting === option.value}
                      onChange={e => setOnlineMeeting(e.target.value)}
                    />
                    <Label>{option.label}</Label>
                  </InputGroup>
                ))}
              </FormGroup>

              <FormGroup>
                <Label>კვირაში რამდენი დღე ისურვებდი ოფისიდან მუშაობას?*</Label>
                {OfficeValue.map((value, index) => (
                  <InputGroup key={index}>
                    <Input
                      type='radio'
                      name='meetingValue'
                      value={value}
                      checked={officeValue === value}
                      onChange={e => setOfficeValue(Number(e.target.value))}
                    />
                    <Label>{value}</Label>
                  </InputGroup>
                ))}
              </FormGroup>

              <FormGroup>
                <Label>რას ფიქრობ ფიზიკურ შეკრებებზე?</Label>
                <TextInput
                  value={meeting}
                  onChange={e => setMeeting(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  რას ფიქრობ არსებულ გარემოზე: <br />
                  რა მოგწონს, რას დაამატებდი, რას შეცვლიდი?
                </Label>
                <TextInput
                  value={opinion}
                  onChange={e => setOpinion(e.target.value)}
                />
                <Button type='button' onClick={handleSubmit}>
                  დასრულება
                </Button>
              </FormGroup>
            </ContextWrapper>
          </Container>
          <Arrow>
            <LeftArrow onClick={handlePrevStep} />
          </Arrow>
          <LogoContainer>
            <Logo src={Bike} alt='Bike' />
            <HeartIcon />
          </LogoContainer>
        </>
      )}

      {isThanks && <Thanks />}
    </>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding: 0 0 104px 0;
`;

const ContextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50%;
  width: 606px;
`;

const HeadingText = styled.p`
  font-weight: 400;
  font-size: 22px;
  line-height: 27px;
  /* or 123% */

  font-feature-settings: 'cpsp' on;

  color: #232323;
`;

const LogoContainer = styled.div`
  display: flex;
  position: absolute;
  right: 180px;
  top: 215px;
`;

const HeartIcon = styled.div`
  width: 194px;
  height: 172px;
  background: url(${HeartLogo});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 60px;
  left: 90px;
  z-index: -1;
`;

const Logo = styled.img`
  width: 80%;
  height: 80%;
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 44px;
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

const TextInput = styled.textarea`
  border: 0.8px solid #232323;
  height: 184px;
  margin-top: 20px;

  font-style: normal;

  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  padding: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 19px;
  margin-top: 19px;
  margin-left: 11px;

  &:first-of-type {
    margin-top: 17px;
  } // change first input group style

  label {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    color: #232323;
  }
`;

const Button = styled.button`
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  color: #ffffff;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;

  background: #208298;
  border-radius: 42px;
  padding: 17px 29px;
  border: none;
  align-self: flex-end;
  margin-top: 71px;

  cursor: pointer;
`;

const Arrow = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  top: 1776px;
`;

export default Advice;
