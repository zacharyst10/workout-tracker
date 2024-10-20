"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, HelpCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Set = {
  reps: number | string;
  percentage: number;
};

type Exercise = {
  name: string;
  sets: Set[];
  totalReps: number;
  intensity: number;
  isRM: boolean;
};

type Day = {
  name: string;
  exercises: Exercise[];
  avgIntensity: number;
  totalVolume: number;
};

type Week = {
  number: number;
  days: Day[];
};

const workoutData: Week[] = [
  // ... Week 1 data (keep your existing Week 1 data here)

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
            name: "A1. Chin-ups - 3 x 10\nA2. Barbell Bent Row - 3 x 15\nA3. Walking Lunge - 3 x 14/leg",
            sets: [],
            totalReps: 0,
            intensity: 0,
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
            name: "Clean + Front Squat + Jerk - 1+1+1 (% of RM)",
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
            name: "A1. DB Press - 3x10\nA2. BB Upright Row - 3x15\nA3. Box Jump - 3x5",
            sets: [],
            totalReps: 0,
            intensity: 0,
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
            name: "A1. Pull-ups - 3 x 10\nA2. 1-Arm DB Row - 3 x 15/arm\nA3. Walking Lunge - 3 x 15/leg",
            sets: [],
            totalReps: 0,
            intensity: 0,
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
            name: "Clean + Front Squat + Jerk - 1+1+1 (% of RM)",
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
            name: "A1. DB Press - 3x10\nA2. BB Upright Row - 3x15\nA3. Box Jump - 3x5",
            sets: [],
            totalReps: 0,
            intensity: 0,
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
            name: "A1. Pull-ups - 3 x 12\nA2. 1-Arm DB Row - 3 x 15/arm\nA3. Walking Lunge - 3 x 15/leg",
            sets: [],
            totalReps: 0,
            intensity: 0,
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
            name: "Clean + Front Squat + Jerk - 1+1+1 (% of RM)",
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
            name: "A1. DB Press - 3x10\nA2. BB Upright Row - 3x15\nA3. Box Jump - 3x5",
            sets: [],
            totalReps: 0,
            intensity: 0,
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
            name: "A1. Chin-ups - 3 x 10\nA2. Barbell Bent Row - 3 x 15\nA3. Walking Lunge - 3 x 10/leg",
            sets: [],
            totalReps: 0,
            intensity: 0,
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
            name: "A1. Push-up - 3x15\nA2. Alternating KB Press - 3x10/arm\nA3. Box Jump - 3x5",
            sets: [],
            totalReps: 0,
            intensity: 0,
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
            name: "A1. Pull-ups - 3 x 10\nA2. 1-Arm DB Row - 3 x 15/arm\nA3. Step-up (unweighted) - 3x10/leg",
            sets: [],
            totalReps: 0,
            intensity: 0,
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
            name: "A1. DB Press - 3x10\nA2. BB Upright Row - 3x15\nA3. Box Jump - 3x5",
            sets: [],
            totalReps: 0,
            intensity: 0,
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
            name: "A1. Pull-ups - 3 x 10\nA2. 1-Arm DB Row - 3 x 15/arm\nA3. Step-up (unweighted) - 3x12/leg",
            sets: [],
            totalReps: 0,
            intensity: 0,
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
            name: "A1. DB Press - 3x10\nA2. BB Upright Row - 3x15\nA3. Box Jump - 3x5",
            sets: [],
            totalReps: 0,
            intensity: 0,
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
            name: "A1. Pull-ups - 3 x 10\nA2. 1-Arm DB Row - 3 x 15/arm\nA3. Step-up (unweighted) - 3x14/leg",
            sets: [],
            totalReps: 0,
            intensity: 0,
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
            name: "A1. Push-up - 3x15\nA2. Alternating KB Press - 3x10/arm\nA3. Box Jump - 3x5",
            sets: [],
            totalReps: 0,
            intensity: 0,
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
            name: "A1. Pull-ups - 3 x 10\nA2. 1-Arm DB Row - 3 x 15/arm\nA3. Step-up (unweighted) - 3x10/leg",
            sets: [],
            totalReps: 0,
            intensity: 0,
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

const colors = [
  "bg-pink-100 hover:bg-pink-200",
  "bg-purple-100 hover:bg-purple-200",
  "bg-blue-100 hover:bg-blue-200",
  "bg-green-100 hover:bg-green-200",
  "bg-yellow-100 hover:bg-yellow-200",
];

const rmTooltipContent = `
RM stands for "rep max" and means you'll take the exercise up to a maximum weight for the prescribed reps, e.g. 3RM, 5RM, 1RM. If percentages follow an RM prescription, they are of that day's RM, not of the athlete's current 1RM. For example:
         3RM, 90% x 3 x 2

This would mean taking the exercise up to a max weight for 3 reps, then doing 2 more sets of 3 at 90% of that maximum weight.

Sometimes it will be noted alongside RMs that they should not be absolute max testing on that day, but very challenging.
`;

type User = "Zach" | "Jake";

function WorkoutProgram({ user }: { user: User }) {
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([]);
  const [expandedDays, setExpandedDays] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean[]>>({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedProgress = localStorage.getItem(`workoutProgress-${user}`);
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, [user]);

  const toggleWeek = (weekNumber: number) => {
    setExpandedWeeks((prev) =>
      prev.includes(weekNumber)
        ? prev.filter((w) => w !== weekNumber)
        : [...prev, weekNumber]
    );
  };

  const toggleDay = (weekDay: string) => {
    setExpandedDays((prev) =>
      prev.includes(weekDay)
        ? prev.filter((d) => d !== weekDay)
        : [...prev, weekDay]
    );
  };

  const toggleSet = (exerciseId: string, setIndex: number) => {
    setProgress((prev) => {
      const exerciseSets = prev[exerciseId] || [];
      const newExerciseSets = [...exerciseSets];
      newExerciseSets[setIndex] = !newExerciseSets[setIndex];
      const newProgress = { ...prev, [exerciseId]: newExerciseSets };
      localStorage.setItem(
        `workoutProgress-${user}`,
        JSON.stringify(newProgress)
      );
      return newProgress;
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4 text-primary">
        {user}&apos;s Workout Program
      </h2>
      {workoutData.map((week) => (
        <Card
          key={week.number}
          className="overflow-hidden border-2 border-primary"
        >
          <CardHeader
            className="p-4 bg-primary text-primary-foreground cursor-pointer"
            onClick={() => toggleWeek(week.number)}
          >
            <CardTitle className="flex justify-between items-center">
              <span className="text-xl font-semibold">Week {week.number}</span>
              {expandedWeeks.includes(week.number) ? (
                <ChevronUp />
              ) : (
                <ChevronDown />
              )}
            </CardTitle>
          </CardHeader>
          {expandedWeeks.includes(week.number) && (
            <CardContent className="p-4">
              {week.days.map((day, dayIndex) => (
                <div key={day.name} className="mb-4 last:mb-0">
                  <button
                    onClick={() => toggleDay(`${week.number}-${day.name}`)}
                    className={`w-full p-2 rounded-md text-left font-semibold flex justify-between items-center ${
                      colors[dayIndex % colors.length]
                    } transition-colors`}
                  >
                    <span>{day.name}</span>
                    <div className="flex items-center text-sm">
                      <span className="mr-4">AVG {day.avgIntensity}%</span>
                      <span className="mr-2">VOL {day.totalVolume}</span>
                      {expandedDays.includes(`${week.number}-${day.name}`) ? (
                        <ChevronUp />
                      ) : (
                        <ChevronDown />
                      )}
                    </div>
                  </button>
                  {expandedDays.includes(`${week.number}-${day.name}`) && (
                    <div className="mt-2 max-h-[60vh] overflow-y-auto">
                      <ScrollArea className="w-full rounded-md border">
                        <div className="min-w-[1000px]">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[300px] sticky left-0 bg-background z-20">
                                  Exercise
                                </TableHead>
                                <TableHead className="w-[100px] sticky left-[300px] bg-background z-20 text-center">
                                  %RM
                                </TableHead>
                                {Array.from({ length: 10 }, (_, i) => (
                                  <TableHead
                                    key={i}
                                    className="w-[60px] text-center"
                                  >
                                    Set {i + 1}
                                  </TableHead>
                                ))}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {day.exercises.map((exercise, exerciseIndex) => (
                                <TableRow key={exerciseIndex}>
                                  <TableCell className="font-medium sticky left-0 bg-background z-10">
                                    <div className="flex items-start space-x-2 pr-2">
                                      <div className="flex-1">
                                        <span className="break-words">
                                          {exercise.name}
                                        </span>
                                        {exercise.isRM && (
                                          <Badge
                                            variant="secondary"
                                            className="ml-1"
                                          >
                                            RM
                                          </Badge>
                                        )}
                                      </div>
                                      {exercise.isRM && (
                                        <TooltipProvider>
                                          <Tooltip
                                            open={isOpen}
                                            onOpenChange={setIsOpen}
                                          >
                                            <TooltipTrigger asChild>
                                              <button
                                                onClick={() => setIsOpen(true)}
                                                className="focus:outline-none"
                                              >
                                                <HelpCircle className="h-4 w-4 flex-shrink-0 text-muted-foreground cursor-help" />
                                              </button>
                                            </TooltipTrigger>
                                            <TooltipContent
                                              side="top"
                                              className="max-w-[280px] sm:max-w-sm p-4 relative"
                                              sideOffset={5}
                                            >
                                              <button
                                                onClick={() => setIsOpen(false)}
                                                className="absolute top-2 right-2 focus:outline-none"
                                              >
                                                <X className="h-4 w-4" />
                                              </button>
                                              <p className="font-bold mb-2">
                                                RM (Rep Max)
                                              </p>
                                              <p>{rmTooltipContent}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-center sticky left-[300px] bg-background z-10">
                                    {exercise.intensity}%
                                  </TableCell>
                                  {Array.from({ length: 10 }, (_, i) => (
                                    <TableCell
                                      key={i}
                                      className="text-center p-0"
                                    >
                                      {exercise.sets[i] ? (
                                        <div className="flex flex-col items-center py-2">
                                          <div className="text-sm">
                                            {exercise.sets[i].reps}
                                          </div>
                                          <div className="text-xs text-muted-foreground">
                                            {exercise.sets[i].percentage}%
                                          </div>
                                          <Checkbox
                                            checked={
                                              progress[
                                                `${user}-${week.number}-${day.name}-${exerciseIndex}`
                                              ]?.[i] || false
                                            }
                                            onCheckedChange={() =>
                                              toggleSet(
                                                `${user}-${week.number}-${day.name}-${exerciseIndex}`,
                                                i
                                              )
                                            }
                                          />
                                        </div>
                                      ) : null}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}

export default function WorkoutProgramTabs() {
  const [activeTab, setActiveTab] = useState<User>("Zach");

  useEffect(() => {
    const storedTab = localStorage.getItem("activeWorkoutTab") as User | null;
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  const handleTabChange = (tab: User) => {
    setActiveTab(tab);
    localStorage.setItem("activeWorkoutTab", tab);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-primary">
        8-Week Clean-Focused Program
      </h1>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange as (value: string) => void}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="Zach">Zach</TabsTrigger>
          <TabsTrigger value="Jake">Jake</TabsTrigger>
        </TabsList>
        <TabsContent value="Zach">
          <WorkoutProgram user="Zach" />
        </TabsContent>
        <TabsContent value="Jake">
          <WorkoutProgram user="Jake" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
