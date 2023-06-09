import cn from 'classnames';
import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { RemoveButton } from '@/components/common';

import { useAppDispatch } from '@/hooks/hooks';
import { useWorkout } from '@/hooks/useWorkout';

import { updateExerciseInCurrentWorkout } from '@/store/slices/current-workout.slice';
import { removeWorkout, updateWorkout } from '@/store/slices/workouts.slice';

import { RoutePaths } from '@/types/route.type';

import styles from './Workout.module.scss';

const Workout: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const workout = useWorkout();

  const handleRemoveWorkout = () => {
    dispatch(removeWorkout(workout.id));
    navigate(RoutePaths.HOME);
  };

  const handleCompleteExercise = (exerciseId: string) => {
    const updatedWorkout = {
      ...workout,
      exercises: workout.exercises.map(exercise =>
        exercise.id === exerciseId
          ? { ...exercise, isCompleted: true }
          : exercise
      )
    };

    dispatch(updateExerciseInCurrentWorkout(exerciseId));
    dispatch(updateWorkout(updatedWorkout));
  };

  return (
    <div className={styles.workout}>
      <div className={styles.button}>
        <p className={styles.title}>{`Workout name - ${workout.title}`}</p>
        <RemoveButton onClick={handleRemoveWorkout} />
      </div>
      <div className={styles.exercises}>
        {workout.exercises.map(exercise => (
          <div
            key={exercise.id}
            onClick={() => handleCompleteExercise(exercise.id)}
            className={cn(
              styles.exercise,
              exercise.isCompleted && styles.exercise__success
            )}
          >
            <div className={styles.exerciseName}>
              <p>{exercise.name}</p>
              <img src={exercise.icon} alt={exercise.name} />
            </div>

            <div className={styles.exerciseDetails}>
              <p
                className={styles.exerciseDetail}
              >{`Sets : ${exercise.sets}`}</p>
              <p
                className={styles.exerciseDetail}
              >{`Repetitions : ${exercise.sets}`}</p>
              <p
                className={styles.exerciseDetail}
              >{`Lead time : ${exercise.sets}`}</p>
              <p
                className={styles.exerciseDetail}
              >{`Work weight : ${exercise.sets}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Workout);
