import { ChangeEvent, FC, memo } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

import { useAppDispatch } from '@/hooks/hooks';

import { addExercise } from '@/store/slices/exercises.slice';
import { addNotification } from '@/store/slices/notifications.slice';

import { EXERCISES } from '@/types/enams/exercises.enam';
import { ExerciseType } from '@/types/exercise.type';

import styles from './ExerciseForm.module.scss';

import Button from '../buttons/button/Button';
import RadioGroup from '../radio-group/RadioGroup';

import ExerciseDetails from './exrcise-details/ExerciseDetails';
import { getFormattedDate } from '@/utils/helpers/getFormattedDate';
import { getWeatherMessage } from '@/utils/helpers/getWeatherMessage';

export interface ExerciseFormData extends Omit<ExerciseType, 'name' | 'icon'> {
  exercise: string;
}

interface ExerciseFormProps {
  startDate: Date;
}

const ExerciseForm: FC<ExerciseFormProps> = ({ startDate }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ExerciseFormData>({ mode: 'onChange' });

  const handleCreateExercise = (data: ExerciseFormData) => {
    const { exercise, sets, reps, time, weight } = data;

    const { name, icon } = JSON.parse(exercise);
    const newExercise = {
      id: uuid(),
      name,
      sets,
      reps,
      time,
      weight,
      icon,
      isCompleted: false
    };

    dispatch(addExercise(newExercise));

    reset();
  };

  const handleChangeRadioGroup = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name } = JSON.parse(event.target.value);

    if (name === EXERCISES.LEGS) {
      const weatherMessage = await getWeatherMessage();
      const newNotification = {
        id: uuid(),
        message: weatherMessage,
        date: getFormattedDate(startDate),
        isCompleted: false
      };

      dispatch(addNotification(newNotification));
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreateExercise)} className={styles.form}>
      <p className={styles.title}>Exersises</p>

      <RadioGroup
        register={register('exercise', {
          required: true,
          onChange: handleChangeRadioGroup
        })}
      />

      <ExerciseDetails register={register} errors={errors} />

      <Button className={styles.button}>Add exercise</Button>
    </form>
  );
};

export default memo(ExerciseForm);
