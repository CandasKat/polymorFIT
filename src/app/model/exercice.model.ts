export interface Exercice{
  bodyPart: string,
  equipment: string,
  gifUrl: string,
  id: string,
  name: string,
  target: string,
  time?: number,
  repetition?: number,
}


export interface Workouts{
  userId: number,
  exerciceId: string,
  startTime?: string,
  endTime?: string,
  duration: number,
  id?: number,
  caloriesBurned: number
}

export interface DayData {
  date: string;
  exerciseTime: number;
  isExercised: boolean;
  startTime?: string;
  endTime?: string
}
