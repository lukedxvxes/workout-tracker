export interface TargetMuscle {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseInterface {
  id: number;
  user_id: number;
  name: string;
  targetMuscle: TargetMuscle[];
  createdAt: string;
  updatedAt: string;
}

export interface TargetMuscleInterface {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutInterface {
  id: number;
  workout_id: string;
  user_id: number;
  exercise: ExerciseInterface[];
  reps: number;
  weight: number;
  createdAt: string;
  updatedAt: string;
}
export interface UserInterface {
  createdAt: string;
  firstName: string;
  id: number;
  lastName: string;
  updatedAt: string;
  username: string;
}
