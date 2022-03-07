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
