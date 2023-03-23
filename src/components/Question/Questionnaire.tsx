import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Vaccinate } from '../../assets/images';
import RightArrow from '../../svg/RightArrow';
import LeftArrow from '../../svg/LeftArrow';
import InputField from '../InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setIsDisabled } from '../../features/questSlice';

type QuestionnaireProps = {
  nextStep: () => void;
  prevStep: () => void;
};

interface IFormInput {
  თარიღი: string;
  ანტისხეუილების_რიცხვი: string;
  რიცხვი: string;
}

const Questionnaire = ({ nextStep, prevStep }: QuestionnaireProps) => {
  const { isDisabled } = useAppSelector(state => state.quest);
  const dispatch = useAppDispatch();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [AntiValue, setAntiValue] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      თარიღი: '',
      რიცხვი: '',
      ანტისხეუილების_რიცხვი: '',
    },

    mode: 'onChange',
  });

  const CovidOptions = [
    {
      label: 'კი',
      value: 'კი',
    },

    {
      label: 'არა',
      value: 'არა',
    },

    {
      label: 'ახლა მაქვს',
      value: 'ახლა მაქვს',
    },
  ];

  const AntiCovidOptions = [
    {
      label: 'კი',
      value: 'კი',
    },
    {
      label: 'არა',
      value: 'არა',
    },
  ];

  const onSubmit: SubmitHandler<IFormInput> = data => {
    if (
      (selectedValue === 'კი' && AntiValue === 'კი') ||
      selectedValue === 'არა' ||
      selectedValue === 'ახლა მაქვს'
    ) {
      nextStep();
    } else if (
      selectedValue === 'კი' &&
      AntiValue === 'არა' &&
      !errors.თარიღი
    ) {
      nextStep();
    }

    // set data to local storage as object
    localStorage.setItem('covidData', JSON.stringify(data));

    //set selectedValue and AntiValue to local storage
    localStorage.setItem('covid', selectedValue as string);
    localStorage.setItem('antibody', AntiValue as string);
  };

  useEffect(() => {
    const isDisabled = !(selectedValue === 'კი' && AntiValue === null);
    dispatch(setIsDisabled(!isDisabled));
  }, [selectedValue, AntiValue]);

  useEffect(() => {
    dispatch(setIsDisabled(errors.თარიღი !== undefined));
  }, [errors.თარიღი]);

  useEffect(() => {
    // get data from localStorage
    const covidData = localStorage.getItem('covidData');
    const covid = localStorage.getItem('covid');
    const antibody = localStorage.getItem('antibody');

    if (covidData !== null) {
      reset(JSON.parse(covidData));
    }

    if (covid) {
      setSelectedValue(covid);
    }

    if (antibody) {
      setAntiValue(antibody);
    }
  }, []);

  return (
    <Container>
      <FormGroup>
        <Label htmlFor='კი'>გაქვს გადატანილი Covid-19?*</Label>
        {CovidOptions.map(option => (
          <InputGroup key={option.value}>
            <Input
              type='radio'
              value={option.value}
              checked={selectedValue === option.value}
              onChange={e => setSelectedValue(e.target.value)}
            />

            <Label>{option.label}</Label>
          </InputGroup>
        ))}
      </FormGroup>

      {selectedValue === 'კი' && (
        <FormGroup>
          <Label htmlFor='კი'>ანტისხეულების ტესტი გაქვს გაკეთებული?*</Label>
          {AntiCovidOptions.map(option => (
            <InputGroup key={option.value}>
              <Input
                type='radio'
                value={option.value}
                checked={AntiValue === option.value}
                onChange={e => setAntiValue(e.target.value)}
              />
              <Label>{option.label}</Label>
            </InputGroup>
          ))}
        </FormGroup>
      )}

      {AntiValue === 'კი' && selectedValue === 'კი' ? (
        <FormGroup>
          <Label htmlFor='კი'>
            თუ გახსოვს, გთხოვ მიუთითე ტესტის მიახლოებითი რიცხვი და ანტისხეულების
            რაოდენობა
          </Label>
          <TextInput
            type='text'
            {...register('რიცხვი', {
              pattern: {
                value: /^[0-9]*$/,
                message: 'მხოლოდ ციფრებია დაშვებული',
              },
            })}
            placeholder='რიცხვი'
          />
          {errors.რიცხვი && <Error>{errors.რიცხვი.message}</Error>}

          <TextInput
            type='text'
            {...register('ანტისხეუილების_რიცხვი', {
              pattern: {
                value: /^[0-9]*$/,
                message: 'მხოლოდ ციფრებია დაშვებული',
              },
            })}
            placeholder='ანტისხეულების რაოდენობა'
          />
          {errors.ანტისხეუილების_რიცხვი && (
            <Error>{errors.ანტისხეუილების_რიცხვი.message}</Error>
          )}
        </FormGroup>
      ) : (
        AntiValue === 'არა' &&
        selectedValue === 'კი' && (
          <FormGroup>
            <Label htmlFor='კი'>
              მიუთითე მიახლოებითი პერიოდი (დღე/თვე/წელი) როდის გქონდა Covid-19*
              <TextInput
                type='text'
                {...register('თარიღი', {
                  required: {
                    value: true,
                    message: 'აუცილებელია შევსება',
                  },
                  pattern: {
                    // date format: dd/mm/yy
                    value: /^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2})$/,
                    message: 'მიუთითეთ სწორი ფორმატი',
                  },
                })}
                placeholder='დდ/თთ/წწ'
              />
              {errors.თარიღი && <Error>{errors.თარიღი.message}</Error>}
            </Label>
          </FormGroup>
        )
      )}

      <LogoContainer>
        <img src={Vaccinate} alt='vaccinate' />
        <RedCircle />
        <Arrows>
          <LeftArrow onClick={prevStep} />
          <RightArrow
            onClick={handleSubmit(onSubmit)}
            isDisabled={isDisabled}
          />
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
  top: 121px;
  right: 100px;

  /* width: 90%; */

  img {
    width: 90%;
    height: 90%;
  }
`;

const RedCircle = styled.div`
  position: absolute;
  width: 229px;
  height: 229px;
  background: #dd3939;
  border-radius: 50%;
  top: 220px;
  left: 60px;
  z-index: -1;
`;

const Arrows = styled.div`
  display: flex;
  position: absolute;
  gap: 117px;
  left: 92px;
  bottom: 20px;
`;

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;
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
  margin-top: 11px;
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

export default Questionnaire;
