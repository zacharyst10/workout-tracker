export type Set = {
  reps: number | string;
  percentage: number;
};

export type Exercise = {
  name: string;
  sets: Set[];
  totalReps: number;
  intensity: number;
  isRM: boolean;
};

export type Day = {
  name: string;
  exercises: Exercise[];
  avgIntensity: number;
  totalVolume: number;
};

export type Week = {
  number: number;
  days: Day[];
};

export const workoutData: Week[] = [
  {
    number: 1,
    days: [
      {
        name: "MONDAY",
        avgIntensity: 92,
        totalVolume: 31,
        exercises: [
          {
            name: "Clean Pull + Clean + Front Squat - 1+1+1 (% of RM)",
            sets: Array(3).fill({ reps: 3, percentage: 90 }),
            totalReps: 9,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Clean Pull from Riser (mid-shin) - 2+2",
            sets: Array(4).fill({ reps: 4, percentage: 90 }),
            totalReps: 16,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Pause Front Squat (% of RM)",
            sets: [
              { reps: 5, percentage: 90 },
              { reps: 5, percentage: 90 },
              { reps: "AMRAP", percentage: 90 },
            ],
            totalReps: 10,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Weighted Planks - 3 x 20-30sec",
            sets: Array(3).fill({ reps: "20-30sec", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
      {
        name: "TUESDAY",
        avgIntensity: 68,
        totalVolume: 35,
        exercises: [
          {
            name: "Hang Power Clean (knee) (% of clean)",
            sets: Array(10).fill({ reps: 2, percentage: 60 }),
            totalReps: 20,
            intensity: 60,
            isRM: false,
          },
          {
            name: "Clean High-Pull",
            sets: Array(5).fill({ reps: 3, percentage: 70 }),
            totalReps: 15,
            intensity: 70,
            isRM: false,
          },
          {
            name: "A1. Pull-ups - 3 x 10",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 90 },
            ],
            totalReps: 9,
            intensity: 90,
            isRM: false,
          },
          {
            name: "A2. 1-Arm DB Row - 3 x 15/arm",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 95 },
            ],
            totalReps: 9,
            intensity: 95,
            isRM: false,
          },
          {
            name: "A3. Walking Lunge - 3 x 12/leg",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 85 },
            ],
            totalReps: 9,
            intensity: 85,
            isRM: false,
          },
        ],
      },
      {
        name: "WEDNESDAY",
        avgIntensity: 92,
        totalVolume: 30,
        exercises: [
          {
            name: "Clean + Jerk - 1+1 (% of RM)",
            sets: Array(3).fill({ reps: 2, percentage: 90 }),
            totalReps: 6,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Clean Pull",
            sets: [
              { reps: 3, percentage: 90 },
              { reps: 3, percentage: 95 },
              { reps: 3, percentage: 100 },
            ],
            totalReps: 9,
            intensity: 95,
            isRM: false,
          },
          {
            name: "Front Squat (% of RM)",
            sets: [
              { reps: 3, percentage: 90 },
              { reps: 3, percentage: 90 },
              { reps: "AMRAP", percentage: 90 },
            ],
            totalReps: 9,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Hanging Leg Raise - 3 x max",
            sets: Array(3).fill({ reps: "max", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
      {
        name: "THURSDAY",
        avgIntensity: 80,
        totalVolume: 29,
        exercises: [
          {
            name: "Push Press (% of RM)",
            sets: [
              { reps: 5, percentage: 90 },
              { reps: 5, percentage: 90 },
              { reps: "AMRAP", percentage: 90 },
            ],
            totalReps: 15,
            intensity: 90,
            isRM: true,
          },
          {
            name: "A1. DB Press - 3x10",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 80 },
            ],
            totalReps: 9,
            intensity: 80,
            isRM: false,
          },
          {
            name: "A2. BB Upright Row - 3x15",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 85 },
            ],
            totalReps: 9,
            intensity: 85,
            isRM: false,
          },
          {
            name: "A3. Box Jump - 3x5",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 70 },
            ],
            totalReps: 9,
            intensity: 70,
            isRM: false,
          },
          {
            name: "Back Squat (% of RM)",
            sets: Array(10).fill({ reps: 2, percentage: 60 }),
            totalReps: 20,
            intensity: 60,
            isRM: false,
          },
          {
            name: "Weighted Planks - 3 x 20-30sec",
            sets: Array(3).fill({ reps: "20-30sec", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
    ],
  },

  {
    number: 2,
    days: [
      {
        name: "MONDAY",
        avgIntensity: 94,
        totalVolume: 34,
        exercises: [
          {
            name: "Segment Clean (knee) + Clean - 1+2 (% of RM)",
            sets: Array(3).fill({ reps: 3, percentage: 90 }),
            totalReps: 9,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Clean Pull on Riser",
            sets: [
              { reps: 3, percentage: 95 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 105 },
              { reps: 3, percentage: 105 },
              { reps: 3, percentage: 105 },
            ],
            totalReps: 15,
            intensity: 102,
            isRM: false,
          },
          {
            name: "Pause Back Squat (% of RM)",
            sets: [
              { reps: 5, percentage: 90 },
              { reps: 5, percentage: 90 },
              { reps: "max", percentage: 90 },
            ],
            totalReps: 10,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Weighted Planks - 3 x 20-30sec",
            sets: Array(3).fill({ reps: "20-30sec", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
      {
        name: "TUESDAY",
        avgIntensity: 68,
        totalVolume: 35,
        exercises: [
          {
            name: "Hang Power Clean (knee) (% of clean)",
            sets: [
              ...Array(5).fill({ reps: 2, percentage: 60 }),
              ...Array(5).fill({ reps: 2, percentage: 65 }),
            ],
            totalReps: 20,
            intensity: 63,
            isRM: false,
          },
          {
            name: "Clean High-Pull",
            sets: [
              { reps: 3, percentage: 70 },
              { reps: 3, percentage: 70 },
              { reps: 3, percentage: 75 },
              { reps: 3, percentage: 75 },
              { reps: 3, percentage: 75 },
            ],
            totalReps: 15,
            intensity: 73,
            isRM: false,
          },
          {
            name: "A1. Chin-ups - 3 x 10",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
            ],
            totalReps: 9,
            intensity: 0,
            isRM: false,
          },
          {
            name: "A2. Barbell Bent Row - 3 x 15",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 90 },
            ],
            totalReps: 9,
            intensity: 90,
            isRM: false,
          },
          {
            name: "A3. Walking Lunge - 3 x 14/leg",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 95 },
            ],
            totalReps: 9,
            intensity: 95,
            isRM: false,
          },
        ],
      },
      {
        name: "WEDNESDAY",
        avgIntensity: 93,
        totalVolume: 30,
        exercises: [
          {
            name: "Clean + Front Squat - 1+1 (% of RM)",
            sets: Array(3).fill({ reps: 3, percentage: 90 }),
            totalReps: 9,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Clean Pull on Riser",
            sets: [
              { reps: 3, percentage: 95 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 105 },
              { reps: 3, percentage: 105 },
              { reps: 3, percentage: 105 },
            ],
            totalReps: 15,
            intensity: 102,
            isRM: false,
          },
          {
            name: "Front Squat (% of RM)",
            sets: [
              { reps: 2, percentage: 90 },
              { reps: 2, percentage: 90 },
              { reps: "max", percentage: 90 },
            ],
            totalReps: 6,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Hanging Leg Raise - 3 x max",
            sets: Array(3).fill({ reps: "max", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
      {
        name: "THURSDAY",
        avgIntensity: 76,
        totalVolume: 29,
        exercises: [
          {
            name: "Power Jerk (% of split jerk)",
            sets: Array(10).fill({ reps: 2, percentage: 63 }),
            totalReps: 20,
            intensity: 63,
            isRM: false,
          },
          {
            name: "Push Press (% of RM)",
            sets: [
              { reps: 3, percentage: 90 },
              { reps: 3, percentage: 90 },
              { reps: "max", percentage: 90 },
            ],
            totalReps: 9,
            intensity: 90,
            isRM: true,
          },
          {
            name: "A1. DB Press - 3x10",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 80 },
            ],
            totalReps: 9,
            intensity: 80,
            isRM: false,
          },
          {
            name: "A2. BB Upright Row - 3x15",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 85 },
            ],
            totalReps: 9,
            intensity: 85,
            isRM: false,
          },
          {
            name: "A3. Box Jump - 3x5",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 70 },
            ],
            totalReps: 9,
            intensity: 70,
            isRM: false,
          },
        ],
      },
    ],
  },

  {
    number: 3,
    days: [
      {
        name: "MONDAY",
        avgIntensity: 90,
        totalVolume: 31,
        exercises: [
          {
            name: "Clean Pull + Clean + Front Squat - 1+1+1 (% of RM)",
            sets: Array(3).fill({ reps: 3, percentage: 90 }),
            totalReps: 9,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Clean Segment Deadlift on Riser (mid-shin) + Clean Deadlift on Riser - 1+3 (% of RM)",
            sets: Array(3).fill({ reps: 4, percentage: 90 }),
            totalReps: 12,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Pause Back Squat (% of RM)",
            sets: [
              { reps: 5, percentage: 90 },
              { reps: 5, percentage: 90 },
              { reps: "max", percentage: 90 },
            ],
            totalReps: 10,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Weighted Planks - 3 x 20-30sec",
            sets: Array(3).fill({ reps: "20-30sec", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
      {
        name: "TUESDAY",
        avgIntensity: 70,
        totalVolume: 35,
        exercises: [
          {
            name: "Hang Power Clean (knee) (% of clean)",
            sets: Array(10).fill({ reps: 2, percentage: 65 }),
            totalReps: 20,
            intensity: 65,
            isRM: false,
          },
          {
            name: "Clean High-Pull",
            sets: Array(5).fill({ reps: 3, percentage: 75 }),
            totalReps: 15,
            intensity: 75,
            isRM: false,
          },
          {
            name: "A1. Pull-ups - 3 x 12",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 90 },
            ],
            totalReps: 9,
            intensity: 90,
            isRM: false,
          },
          {
            name: "A2. 1-Arm DB Row - 3 x 15/arm",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 95 },
            ],
            totalReps: 9,
            intensity: 95,
            isRM: false,
          },
          {
            name: "A3. Walking Lunge - 3 x 15/leg",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 85 },
            ],
            totalReps: 9,
            intensity: 85,
            isRM: false,
          },
        ],
      },
      {
        name: "WEDNESDAY",
        avgIntensity: 94,
        totalVolume: 30,
        exercises: [
          {
            name: "Clean + Front Squat - 1+1 (% of RM)",
            sets: Array(3).fill({ reps: 3, percentage: 90 }),
            totalReps: 9,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Clean Pull on Riser",
            sets: [
              { reps: 3, percentage: 95 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 105 },
              { reps: 3, percentage: 105 },
              { reps: 3, percentage: 105 },
            ],
            totalReps: 15,
            intensity: 102,
            isRM: false,
          },
          {
            name: "Front Squat (% of RM)",
            sets: [
              { reps: 2, percentage: 90 },
              { reps: 2, percentage: 90 },
              { reps: "max", percentage: 90 },
            ],
            totalReps: 6,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Hanging Leg Raise - 3 x max",
            sets: Array(3).fill({ reps: "max", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
      {
        name: "THURSDAY",
        avgIntensity: 78,
        totalVolume: 29,
        exercises: [
          {
            name: "Power Jerk (% of split jerk)",
            sets: Array(10).fill({ reps: 2, percentage: 65 }),
            totalReps: 20,
            intensity: 65,
            isRM: false,
          },
          {
            name: "Push Press (% of RM)",
            sets: [
              { reps: 3, percentage: 90 },
              { reps: 3, percentage: 90 },
              { reps: "max", percentage: 90 },
            ],
            totalReps: 9,
            intensity: 90,
            isRM: true,
          },
          {
            name: "A1. DB Press - 3x10",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 80 },
            ],
            totalReps: 9,
            intensity: 80,
            isRM: false,
          },
          {
            name: "A2. BB Upright Row - 3x15",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 90 },
            ],
            totalReps: 9,
            intensity: 90,
            isRM: false,
          },
          {
            name: "A3. Box Jump - 3x5",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 70 },
            ],
            totalReps: 9,
            intensity: 70,
            isRM: false,
          },
        ],
      },
    ],
  },
  {
    number: 4,
    days: [
      {
        name: "MONDAY",
        avgIntensity: 94,
        totalVolume: 23,
        exercises: [
          {
            name: "Segment Clean (knee) + Clean - 1+1 (% of RM)",
            sets: [
              { reps: 2, percentage: 90 },
              { reps: 2, percentage: 90 },
            ],
            totalReps: 4,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Clean Pull on Riser",
            sets: [
              { reps: 3, percentage: 95 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 105 },
              { reps: 3, percentage: 110 },
            ],
            totalReps: 12,
            intensity: 102.5,
            isRM: false,
          },
          {
            name: "Pause Back Squat (% of RM)",
            sets: [
              { reps: 5, percentage: 90 },
              { reps: "AMRAP", percentage: 90 },
            ],
            totalReps: 5,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Weighted Planks - 3 x 20-30sec",
            sets: Array(3).fill({ reps: "20-30sec", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
      {
        name: "TUESDAY",
        avgIntensity: 68,
        totalVolume: 32,
        exercises: [
          {
            name: "Power Clean (% of clean)",
            sets: Array(8).fill({ reps: 2, percentage: 65 }),
            totalReps: 16,
            intensity: 65,
            isRM: false,
          },
          {
            name: "Clean High-Pull",
            sets: Array(4).fill({ reps: 3, percentage: 70 }),
            totalReps: 12,
            intensity: 70,
            isRM: false,
          },
          {
            name: "A1. Chin-ups - 3 x 10",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
            ],
            totalReps: 9,
            intensity: 0,
            isRM: true,
          },
          {
            name: "A2. Barbell Bent Row - 3 x 15",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 90 },
            ],
            totalReps: 9,
            intensity: 90,
            isRM: false,
          },
          {
            name: "A3. Walking Lunge - 3 x 10/leg",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 95 },
            ],
            totalReps: 9,
            intensity: 95,
            isRM: false,
          },
        ],
      },
      {
        name: "WEDNESDAY",
        avgIntensity: 90,
        totalVolume: 24,
        exercises: [
          {
            name: "Clean Pull + Clean - 1+1 (% of RM)",
            sets: Array(3).fill({ reps: 2, percentage: 90 }),
            totalReps: 6,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Clean Segment Deadlift on Riser (mid-shin) + Clean Deadlift on Riser - 1+3 (% of RM)",
            sets: Array(4).fill({ reps: 4, percentage: 90 }),
            totalReps: 16,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Front Squat (% of RM)",
            sets: [
              { reps: 3, percentage: 90 },
              { reps: "AMRAP", percentage: 90 },
            ],
            totalReps: 3,
            intensity: 90,
            isRM: true,
          },
          {
            name: "Hanging Leg Raise - 3 x max",
            sets: Array(3).fill({ reps: "max", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
      {
        name: "THURSDAY",
        avgIntensity: 78,
        totalVolume: 21,
        exercises: [
          {
            name: "Power Jerk + Jerk - 1+1 (% of split jerk)",
            sets: Array(8).fill({ reps: 2, percentage: 65 }),
            totalReps: 16,
            intensity: 65,
            isRM: false,
          },
          {
            name: "Push Press (% of RM)",
            sets: [
              { reps: 5, percentage: 90 },
              { reps: "AMRAP", percentage: 90 },
            ],
            totalReps: 5,
            intensity: 90,
            isRM: true,
          },
          {
            name: "A1. Push-up - 3x15",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 85 },
            ],
            totalReps: 9,
            intensity: 85,
            isRM: false,
          },
          {
            name: "A2. Alternating KB Press - 3x10/arm",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 80 },
            ],
            totalReps: 9,
            intensity: 80,
            isRM: false,
          },
          {
            name: "A3. Box Jump - 3x5",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 70 },
            ],
            totalReps: 9,
            intensity: 70,
            isRM: false,
          },
        ],
      },
    ],
  },
  {
    number: 5,
    days: [
      {
        name: "MONDAY",
        avgIntensity: 93,
        totalVolume: 27,
        exercises: [
          {
            name: "Clean (% of Clean RM; back-offs OTM)",
            sets: Array(6).fill({ reps: 1, percentage: 80 }),
            totalReps: 6,
            intensity: 80,
            isRM: false,
          },
          {
            name: "Clean Pull",
            sets: [
              { reps: 3, percentage: 95 },
              { reps: 3, percentage: 100 },
              { reps: 2, percentage: 105 },
              { reps: 2, percentage: 105 },
              { reps: 2, percentage: 105 },
            ],
            totalReps: 12,
            intensity: 102,
            isRM: false,
          },
          {
            name: "Back Squat (% of RM)",
            sets: Array(3).fill({ reps: 3, percentage: 75 }),
            totalReps: 9,
            intensity: 75,
            isRM: false,
          },
          {
            name: "Weighted Planks - 3 x 20-30sec",
            sets: Array(3).fill({ reps: "20-30sec", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
      {
        name: "TUESDAY",
        avgIntensity: 68,
        totalVolume: 32,
        exercises: [
          {
            name: "Power Clean + Power Jerk - 1+1 (% of CJ)",
            sets: Array(10).fill({ reps: 2, percentage: 60 }),
            totalReps: 20,
            intensity: 60,
            isRM: false,
          },
          {
            name: "Block Clean High-Pull (knee)",
            sets: Array(4).fill({ reps: 3, percentage: 75 }),
            totalReps: 12,
            intensity: 75,
            isRM: false,
          },
          {
            name: "A1. Pull-ups - 3 x 10",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 90 },
            ],
            totalReps: 9,
            intensity: 90,
            isRM: false,
          },
          {
            name: "A2. 1-Arm DB Row - 3 x 15/arm",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 95 },
            ],
            totalReps: 9,
            intensity: 95,
            isRM: false,
          },
          {
            name: "A3. Step-up (unweighted) - 3x10/leg",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 85 },
            ],
            totalReps: 9,
            intensity: 85,
            isRM: false,
          },
        ],
      },
      {
        name: "WEDNESDAY",
        avgIntensity: 93,
        totalVolume: 26,
        exercises: [
          {
            name: "Clean & Jerk - 1+1 (% of RM; back-offs OTM)",
            sets: Array(6).fill({ reps: 2, percentage: 80 }),
            totalReps: 12,
            intensity: 80,
            isRM: false,
          },
          {
            name: "Clean Pull",
            sets: [
              { reps: 3, percentage: 95 },
              { reps: 3, percentage: 100 },
              { reps: 2, percentage: 105 },
              { reps: 2, percentage: 105 },
              { reps: 2, percentage: 105 },
            ],
            totalReps: 12,
            intensity: 102,
            isRM: false,
          },
          {
            name: "Front Squat (% of RM)",
            sets: Array(2).fill({ reps: 2, percentage: 90 }),
            totalReps: 4,
            intensity: 90,
            isRM: false,
          },
          {
            name: "Hanging Leg Raise - 3 x max",
            sets: Array(3).fill({ reps: "max", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
      {
        name: "THURSDAY",
        avgIntensity: 75,
        totalVolume: 29,
        exercises: [
          {
            name: "Pause Jerk",
            sets: Array(10).fill({ reps: 2, percentage: 60 }),
            totalReps: 20,
            intensity: 60,
            isRM: false,
          },
          {
            name: "Push Press (% of RM)",
            sets: Array(3).fill({ reps: 3, percentage: 90 }),
            totalReps: 9,
            intensity: 90,
            isRM: false,
          },
          {
            name: "A1. DB Press - 3x10",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 80 },
            ],
            totalReps: 9,
            intensity: 80,
            isRM: false,
          },
          {
            name: "A2. BB Upright Row - 3x15",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 90 },
            ],
            totalReps: 9,
            intensity: 90,
            isRM: false,
          },
          {
            name: "A3. Box Jump - 3x5",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 70 },
            ],
            totalReps: 9,
            intensity: 70,
            isRM: false,
          },
        ],
      },
    ],
  },
  {
    number: 6,
    days: [
      {
        name: "MONDAY",
        avgIntensity: 94,
        totalVolume: 23,
        exercises: [
          {
            name: "Clean (% of Clean RM; back-offs OTM)",
            sets: Array(5).fill({ reps: 1, percentage: 85 }),
            totalReps: 5,
            intensity: 85,
            isRM: false,
          },
          {
            name: "Clean Pull",
            sets: [
              { reps: 3, percentage: 95 },
              { reps: 3, percentage: 100 },
              { reps: 2, percentage: 105 },
              { reps: 2, percentage: 110 },
              { reps: 2, percentage: 110 },
            ],
            totalReps: 12,
            intensity: 104,
            isRM: false,
          },
          {
            name: "Back Squat (% of RM)",
            sets: Array(2).fill({ reps: 3, percentage: 90 }),
            totalReps: 6,
            intensity: 90,
            isRM: false,
          },
          {
            name: "Weighted Planks - 3 x 20-30sec",
            sets: Array(3).fill({ reps: "20-30sec", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
      {
        name: "TUESDAY",
        avgIntensity: 70,
        totalVolume: 32,
        exercises: [
          {
            name: "Power Clean + Power Jerk - 1+1 (% of CJ)",
            sets: [
              ...Array(5).fill({ reps: 2, percentage: 60 }),
              ...Array(5).fill({ reps: 2, percentage: 65 }),
            ],
            totalReps: 20,
            intensity: 63,
            isRM: false,
          },
          {
            name: "Block Clean High-Pull (knee)",
            sets: [
              ...Array(2).fill({ reps: 3, percentage: 75 }),
              ...Array(2).fill({ reps: 3, percentage: 80 }),
            ],
            totalReps: 12,
            intensity: 78,
            isRM: false,
          },
          {
            name: "A1. Pull-ups - 3 x 10",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 90 },
            ],
            totalReps: 9,
            intensity: 90,
            isRM: false,
          },
          {
            name: "A2. 1-Arm DB Row - 3 x 15/arm",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 95 },
            ],
            totalReps: 9,
            intensity: 95,
            isRM: false,
          },
          {
            name: "A3. Step-up (unweighted) - 3x12/leg",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 90 },
            ],
            totalReps: 9,
            intensity: 90,
            isRM: false,
          },
        ],
      },
      {
        name: "WEDNESDAY",
        avgIntensity: 93,
        totalVolume: 26,
        exercises: [
          {
            name: "Clean & Jerk - 1+1 (% of RM; back-offs OTM)",
            sets: Array(5).fill({ reps: 2, percentage: 85 }),
            totalReps: 10,
            intensity: 85,
            isRM: false,
          },
          {
            name: "Clean Pull",
            sets: [
              { reps: 3, percentage: 95 },
              { reps: 3, percentage: 100 },
              { reps: 2, percentage: 105 },
              { reps: 2, percentage: 110 },
              { reps: 2, percentage: 110 },
            ],
            totalReps: 12,
            intensity: 104,
            isRM: false,
          },
          {
            name: "Front Squat (% of RM)",
            sets: Array(2).fill({ reps: 2, percentage: 90 }),
            totalReps: 4,
            intensity: 90,
            isRM: false,
          },
          {
            name: "Hanging Leg Raise - 3 x max",
            sets: Array(3).fill({ reps: "max", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
      {
        name: "THURSDAY",
        avgIntensity: 76,
        totalVolume: 26,
        exercises: [
          {
            name: "Pause Jerk",
            sets: [
              ...Array(5).fill({ reps: 2, percentage: 60 }),
              ...Array(5).fill({ reps: 2, percentage: 65 }),
            ],
            totalReps: 20,
            intensity: 63,
            isRM: false,
          },
          {
            name: "Push Press (% of RM)",
            sets: Array(2).fill({ reps: 3, percentage: 90 }),
            totalReps: 6,
            intensity: 90,
            isRM: false,
          },
          {
            name: "A1. DB Press - 3x10",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 80 },
            ],
            totalReps: 9,
            intensity: 80,
            isRM: false,
          },
          {
            name: "A2. BB Upright Row - 3x15",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 85 },
            ],
            totalReps: 9,
            intensity: 85,
            isRM: false,
          },
          {
            name: "A3. Box Jump - 3x5",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 70 },
            ],
            totalReps: 9,
            intensity: 70,
            isRM: false,
          },
        ],
      },
    ],
  },
  {
    number: 7,
    days: [
      {
        name: "MONDAY",
        avgIntensity: 94,
        totalVolume: 15,
        exercises: [
          {
            name: "Clean (% of Clean RM; back-offs OTM)",
            sets: Array(4).fill({ reps: 1, percentage: 90 }),
            totalReps: 4,
            intensity: 90,
            isRM: false,
          },
          {
            name: "Clean Pull",
            sets: [
              { reps: 2, percentage: 95 },
              { reps: 2, percentage: 100 },
              { reps: 2, percentage: 100 },
              { reps: 2, percentage: 100 },
            ],
            totalReps: 8,
            intensity: 99,
            isRM: false,
          },
          {
            name: "Back Squat (% of RM)",
            sets: [{ reps: 3, percentage: 90 }],
            totalReps: 3,
            intensity: 90,
            isRM: false,
          },
          {
            name: "Weighted Planks - 3 x 20-30sec",
            sets: Array(3).fill({ reps: "20-30sec", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
      {
        name: "TUESDAY",
        avgIntensity: 73,
        totalVolume: 28,
        exercises: [
          {
            name: "Power Clean + Power Jerk - 1+1 (% of CJ)",
            sets: Array(8).fill({ reps: 2, percentage: 65 }),
            totalReps: 16,
            intensity: 65,
            isRM: false,
          },
          {
            name: "Block Clean High-Pull (knee)",
            sets: Array(4).fill({ reps: 3, percentage: 80 }),
            totalReps: 12,
            intensity: 80,
            isRM: false,
          },
          {
            name: "A1. Pull-ups - 3 x 10",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 90 },
            ],
            totalReps: 9,
            intensity: 90,
            isRM: false,
          },
          {
            name: "A2. 1-Arm DB Row - 3 x 15/arm",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 95 },
            ],
            totalReps: 9,
            intensity: 95,
            isRM: false,
          },
          {
            name: "A3. Step-up (unweighted) - 3x14/leg",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 85 },
            ],
            totalReps: 9,
            intensity: 85,
            isRM: false,
          },
        ],
      },
      {
        name: "WEDNESDAY",
        avgIntensity: 94,
        totalVolume: 18,
        exercises: [
          {
            name: "Clean & Jerk - 1+1 (% of RM; back-offs OTM)",
            sets: Array(4).fill({ reps: 2, percentage: 90 }),
            totalReps: 8,
            intensity: 90,
            isRM: false,
          },
          {
            name: "Clean Pull",
            sets: [
              { reps: 2, percentage: 95 },
              { reps: 2, percentage: 100 },
              { reps: 2, percentage: 100 },
              { reps: 2, percentage: 100 },
            ],
            totalReps: 8,
            intensity: 99,
            isRM: false,
          },
          {
            name: "Front Squat (% of RM)",
            sets: [{ reps: 2, percentage: 90 }],
            totalReps: 2,
            intensity: 90,
            isRM: false,
          },
          {
            name: "Hanging Leg Raise - 3 x max",
            sets: Array(3).fill({ reps: "max", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
      {
        name: "THURSDAY",
        avgIntensity: 78,
        totalVolume: 21,
        exercises: [
          {
            name: "Power Jerk + Jerk - 1+1 (% of split jerk)",
            sets: Array(8).fill({ reps: 2, percentage: 65 }),
            totalReps: 16,
            intensity: 65,
            isRM: false,
          },
          {
            name: "Push Press (% of RM)",
            sets: [{ reps: 5, percentage: 90 }],
            totalReps: 5,
            intensity: 90,
            isRM: false,
          },
          {
            name: "A1. Push-up - 3x15",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 95 },
            ],
            totalReps: 9,
            intensity: 95,
            isRM: false,
          },
          {
            name: "A2. Alternating KB Press - 3x10/arm",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 90 },
            ],
            totalReps: 9,
            intensity: 90,
            isRM: false,
          },
          {
            name: "A3. Box Jump - 3x5",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 70 },
            ],
            totalReps: 9,
            intensity: 70,
            isRM: false,
          },
        ],
      },
    ],
  },
  {
    number: 8,
    days: [
      {
        name: "MONDAY",
        avgIntensity: 77,
        totalVolume: 25,
        exercises: [
          {
            name: "Clean",
            sets: [
              { reps: 1, percentage: 70 },
              { reps: 1, percentage: 75 },
              { reps: 1, percentage: 80 },
              { reps: 1, percentage: 85 },
              { reps: 1, percentage: 85 },
              { reps: 1, percentage: 85 },
            ],
            totalReps: 6,
            intensity: 80,
            isRM: false,
          },
          {
            name: "Clean & Jerk - 1+1",
            sets: [
              { reps: 2, percentage: 70 },
              { reps: 2, percentage: 75 },
              { reps: 2, percentage: 80 },
              { reps: 2, percentage: 85 },
              { reps: 2, percentage: 75 },
            ],
            totalReps: 10,
            intensity: 77,
            isRM: false,
          },
          {
            name: "Back Squat",
            sets: Array(3).fill({ reps: 3, percentage: 75 }),
            totalReps: 9,
            intensity: 75,
            isRM: false,
          },
          {
            name: "Weighted Planks - 3 x 20-30sec",
            sets: Array(3).fill({ reps: "20-30sec", percentage: 0 }),
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
      {
        name: "TUESDAY",
        avgIntensity: 68,
        totalVolume: 32,
        exercises: [
          {
            name: "Power Clean + Power Jerk - 1+1 (% of CJ)",
            sets: Array(10).fill({ reps: 2, percentage: 60 }),
            totalReps: 20,
            intensity: 60,
            isRM: false,
          },
          {
            name: "Block Clean High-Pull (knee)",
            sets: Array(4).fill({ reps: 3, percentage: 75 }),
            totalReps: 12,
            intensity: 75,
            isRM: false,
          },
          {
            name: "A1. Pull-ups - 3 x 10",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 90 },
            ],
            totalReps: 9,
            intensity: 90,
            isRM: false,
          },
          {
            name: "A2. 1-Arm DB Row - 3 x 15/arm",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 95 },
            ],
            totalReps: 9,
            intensity: 95,
            isRM: false,
          },
          {
            name: "A3. Step-up (unweighted) - 3x10/leg",
            sets: [
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 100 },
              { reps: 3, percentage: 85 },
            ],
            totalReps: 9,
            intensity: 85,
            isRM: false,
          },
        ],
      },
      {
        name: "WEDNESDAY (Max Out Day)",
        avgIntensity: 0,
        totalVolume: 0,
        exercises: [
          {
            name: "Clean",
            sets: [{ reps: 1, percentage: 0 }],
            totalReps: 1,
            intensity: 0,
            isRM: true,
          },
          {
            name: "Clean & Jerk - 1+1",
            sets: [{ reps: 2, percentage: 0 }],
            totalReps: 2,
            intensity: 0,
            isRM: true,
          },
          {
            name: "Front Squat",
            sets: [{ reps: 1, percentage: 95 }],
            totalReps: 1,
            intensity: 95,
            isRM: true,
          },
        ],
      },
      {
        name: "THURSDAY (Optional - Active Recovery)",
        avgIntensity: 0,
        totalVolume: 0,
        exercises: [
          {
            name: "Light technique work on cleans",
            sets: [],
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
          {
            name: "Mobility and flexibility exercises",
            sets: [],
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
          {
            name: "Low-intensity cardio (e.g., rowing, cycling)",
            sets: [],
            totalReps: 0,
            intensity: 0,
            isRM: false,
          },
        ],
      },
    ],
  },
];
