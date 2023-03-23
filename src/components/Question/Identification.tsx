import styled from 'styled-components';
import { IdentificationLogo, YellowLine } from '../../assets/images';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputField from '../InputField';
import RightArrow from '../../svg/RightArrow';
import { useEffect } from 'react';

interface IFormInput {
  სახელი: string;
  გვარი: string;
  მეილი: string;
}

type Props = {
  nextStep: () => void;
};

const Identification = ({ nextStep }: Props) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      სახელი: '',
      გვარი: '',
      მეილი: '',
    },

    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    // set data to localStorage
    localStorage.setItem('formData', JSON.stringify(data));
    nextStep();
  };

  useEffect(() => {
    // get data from localStorage
    const formData = localStorage.getItem('formData');
    if (formData !== null) {
      reset(JSON.parse(formData));
    }
  }, []);

  const customEmailPattern = /^[a-zA-Z0-9._%+-]+@redberry\.ge$/;
  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <InputField
          {...register('სახელი', {
            required: 'სახელი აუცილებელია',
            minLength: {
              value: 3,
              message: 'სახელის ველი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან',
            },
            maxLength: {
              value: 255,
              message: 'სახელის ველი უნდა შედგებოდეს მაქსიმუმ 255 სიმბოლოსგან',
            },
            pattern: {
              value: /^[ა-ჰ]+$/i,
              message: 'სახელის ველი უნდა შეიცავდეს მხოლოდ ანბანის ასოებს',
            },
          })}
          label='სახელი*'
          error={errors.სახელი?.message}
          placeholder='იოსებ'
          type='text'
        />
        <InputField
          {...register('გვარი', {
            required: 'გვარი აუცილებელია',
            minLength: {
              value: 3,
              message: 'გვარის ველი უნდა შედგებოდეს მინიმუმ 3 სიმბოლოსგან',
            },
            maxLength: {
              value: 255,
              message: 'გვარის ველი უნდა შედგებოდეს მაქსიმუმ 255 სიმბოლოსგან',
            },
            pattern: {
              value: /^[ა-ჰ]+$/i,
              message: 'გვარის ველი უნდა შეიცავდეს მხოლოდ ანბანის ასოებს',
            },
          })}
          type='text'
          error={errors.გვარი?.message}
          label='გვარი*'
          placeholder='ჯუღაშვილი'
        />
        <InputField
          {...register('მეილი', {
            required: 'მეილი აუცილებელია',
            pattern: {
              value: customEmailPattern,
              message:
                'გთხოვთ დარეგისტრირდეთ Redberry-ს მეილით (youremail@redberry.ge)',
            },
          })}
          type='email'
          error={errors.მეილი?.message}
          label='მეილი*'
          placeholder='fbi@redberry.ge'
        />

        <Validation>
          <p>*-ით მონიშნული ველების შევსება სავალდებულოა</p>
        </Validation>
      </FormContainer>

      <LogoContainer>
        <Logo src={IdentificationLogo} alt='Identification Logo' />
        <YellowLogo />
      </LogoContainer>

      <RightArrow onClick={handleSubmit(onSubmit)} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;

  svg {
    position: absolute;
    //bottom center of the screen
    bottom: 50px;
    right: 50%;
    transform: translate(50%, 50%);
  }
`;

const LogoContainer = styled.div`
  display: flex;
  position: absolute;
  top: 94px;
  right: 165px;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

const YellowLogo = styled.div`
  position: absolute;
  top: 230px;
  right: 155px;
  background: #d6d16e;
  width: 622px;
  height: 75px;
  opacity: 0.8;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const Validation = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 111px;
  max-width: 270px;

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #626262;
  }

  &:before {
    content: '';
    display: block;

    width: 237px;
    height: 0px;
    border: 0.8px solid #000000;
    opacity: 0.5;
    margin-bottom: 20px;
  }
`;

const NextPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  width: fit-content;

  border: 1px solid red;
`;

export default Identification;
