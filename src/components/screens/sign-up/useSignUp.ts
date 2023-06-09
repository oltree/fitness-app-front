import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

import { useAppDispatch } from '@/hooks/hooks';

import { addNotification } from '@/store/slices/notifications.slice';

import { AuthUserType } from '@/types/user.type';

import { getFormattedDate } from '@/utils/helpers/getFormattedDate';

export const useSignUp = () => {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AuthUserType>({ mode: 'onChange' });

  const registerUser = (data: AuthUserType) => {
    const { firstName, lastName, email, password } = data;
    const newUser: AuthUserType = { firstName, lastName, email, password };

    const users: AuthUserType[] = JSON.parse(
      localStorage.getItem('users') || '[]'
    );
    const userExists = users.find((user: AuthUserType) => user.email === email);

    if (userExists) {
      setMessage('User with this email already exists!');
    } else {
      const newNotification = {
        id: uuid(),
        date: getFormattedDate(new Date()),
        message: 'registration completed successfully!',
        isCompleted: false
      };
      dispatch(addNotification(newNotification));

      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      setRedirect(true);
    }

    reset();
  };

  const onSubmit = handleSubmit(registerUser);

  return { message, redirect, errors, register, onSubmit };
};

export type signUpReturnType = ReturnType<typeof useSignUp>;
