import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import RemoveButton from '@/components/common/buttons/remove-button/RemoveButton';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

import { currentWorkoutSelector } from '@/store/selectors';
import { removeWorkout } from '@/store/slices/workouts.slice';

import { RoutePaths } from '@/types/route.type';

import styles from './Workout.module.scss';

const Workout: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const workout = useAppSelector(currentWorkoutSelector);

	const handleRemoveWorkout = () => {
		dispatch(removeWorkout(workout.id));
		navigate(RoutePaths.HOME);
	};

	return (
		<div className={styles.workout}>
			<div className={styles.button}>
				<p className={styles.title}>{`Workout name - ${workout.title}`}</p>
				<RemoveButton onClick={handleRemoveWorkout} />
			</div>
			<div className={styles.exercises}>
				{workout.exercises.map(exercise => (
					<div key={exercise.id} className={styles.exercise}>
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

export default Workout;
