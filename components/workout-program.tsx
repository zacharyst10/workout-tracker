"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Checkbox } from "./ui/checkbox";

const workoutData = [
  {
    week: 1,
    days: [
      {
        day: "Day 1",
        exercises: [
          {
            name: "Clean Pull + Clean + Front Squat",
            sets: "3 sets of 1+1+1 @ 90% of Clean RM",
          },
          {
            name: "Clean Segment Deadlift on Riser + Clean Deadlift on Riser",
            sets: "4 sets of 2+2 @ 90% of Clean RM",
          },
          {
            name: "Pause Back Squat",
            sets: "2 sets of 5 @ 90% of Back Squat RM (Last set AMRAP)",
          },
          { name: "Weighted Planks", sets: "3 sets of 20-30sec" },
        ],
      },
      {
        day: "Day 2",
        exercises: [
          {
            name: "Hang Power Clean (knee)",
            sets: "10 sets of 2 @ 65% of Clean RM",
          },
          { name: "Clean High-Pull", sets: "5 sets of 3 @ 70% of Clean RM" },
          { name: "Pull-ups", sets: "3 sets of 10" },
          { name: "1-Arm DB Row", sets: "3 sets of 15/arm" },
          { name: "Walking Lunge", sets: "3 sets of 15/leg" },
        ],
      },
      {
        day: "Day 3",
        exercises: [
          {
            name: "Clean + Front Squat",
            sets: "3 sets of 1+1 @ 90% of Clean RM",
          },
          {
            name: "Clean Pull on Riser",
            sets: "1 set of 3 @ 95%, 2 sets of 3 @ 100%, 2 sets of 3 @ 105% of Clean RM",
          },
          {
            name: "Front Squat",
            sets: "2 sets of 3 @ 90% of Front Squat RM (Last set AMRAP)",
          },
          { name: "Hanging Leg Raise", sets: "3 sets to max" },
        ],
      },
      {
        day: "Day 4 (Optional)",
        exercises: [
          {
            name: "Push Press",
            sets: "2 sets of 5 @ 90% of Push Press RM (Last set AMRAP)",
          },
          { name: "DB Press", sets: "3 sets of 10" },
          { name: "BB Upright Row", sets: "3 sets of 15" },
          { name: "Box Jump", sets: "3 sets of 5" },
        ],
      },
    ],
  },
  {
    week: 2,
    days: [
      {
        day: "Day 1",
        exercises: [
          {
            name: "Segment Clean (knee) + Clean",
            sets: "3 sets of 1+2 @ 90% of Clean RM",
          },
          {
            name: "Clean Pull on Riser",
            sets: "1 set of 3 @ 95%, 1 set of 3 @ 100%, 1 set of 3 @ 105% of Clean RM",
          },
          {
            name: "Pause Back Squat",
            sets: "2 sets of 5 @ 90% of Back Squat RM (Last set AMRAP)",
          },
          { name: "Weighted Planks", sets: "3 sets of 20-30sec" },
        ],
      },
      {
        day: "Day 2",
        exercises: [
          {
            name: "Hang Power Clean (knee)",
            sets: "5 sets of 2 @ 60%, 5 sets of 2 @ 65% of Clean RM",
          },
          {
            name: "Clean High-Pull",
            sets: "2 sets of 3 @ 70%, 3 sets of 3 @ 75% of Clean RM",
          },
          { name: "Chin-ups", sets: "3 sets of 10" },
          { name: "Barbell Bent Row", sets: "3 sets of 15" },
          { name: "Walking Lunge", sets: "3 sets of 14/leg" },
        ],
      },
      {
        day: "Day 3",
        exercises: [
          {
            name: "Clean Pull + Clean",
            sets: "4 sets of 1+1 @ 90% of Clean RM",
          },
          {
            name: "Clean Segment Deadlift on Riser + Clean Deadlift on Riser",
            sets: "4 sets of 1+3 @ 90% of Clean RM",
          },
          {
            name: "Front Squat",
            sets: "2 sets of 3 @ 90% of Front Squat RM (Last set AMRAP)",
          },
          { name: "Hanging Leg Raise", sets: "3 sets to max" },
        ],
      },
      {
        day: "Day 4 (Optional)",
        exercises: [
          {
            name: "Push Press",
            sets: "2 sets of 5 @ 90% of Push Press RM (Last set AMRAP)",
          },
          { name: "Push-up", sets: "3 sets of 15" },
          { name: "Alternating KB Press", sets: "3 sets of 10/arm" },
          { name: "Box Jump", sets: "3 sets of 5" },
        ],
      },
    ],
  },
  {
    week: 3,
    days: [
      {
        day: "Day 1",
        exercises: [
          {
            name: "Clean Pull + Clean + Front Squat",
            sets: "3 sets of 1+1+1 @ 90% of Clean RM",
          },
          {
            name: "Clean Segment Deadlift on Riser + Clean Deadlift on Riser",
            sets: "4 sets of 1+3 @ 90% of Clean RM",
          },
          {
            name: "Pause Back Squat",
            sets: "2 sets of 5 @ 90% of Back Squat RM (Last set AMRAP)",
          },
          { name: "Weighted Planks", sets: "3 sets of 20-30sec" },
        ],
      },
      {
        day: "Day 2",
        exercises: [
          {
            name: "Hang Power Clean (knee)",
            sets: "10 sets of 2 @ 65% of Clean RM",
          },
          { name: "Clean High-Pull", sets: "5 sets of 3 @ 75% of Clean RM" },
          { name: "Pull-ups", sets: "3 sets of 12" },
          { name: "1-Arm DB Row", sets: "3 sets of 15/arm" },
          { name: "Walking Lunge", sets: "3 sets of 15/leg" },
        ],
      },
      {
        day: "Day 3",
        exercises: [
          {
            name: "Clean + Front Squat",
            sets: "3 sets of 1+1 @ 90% of Clean RM",
          },
          {
            name: "Clean Pull on Riser",
            sets: "1 set of 3 @ 95%, 2 sets of 3 @ 100%, 2 sets of 3 @ 105% of Clean RM",
          },
          {
            name: "Front Squat",
            sets: "2 sets of 3 @ 90% of Front Squat RM (Last set AMRAP)",
          },
          { name: "Hanging Leg Raise", sets: "3 sets to max" },
        ],
      },
      {
        day: "Day 4 (Optional)",
        exercises: [
          {
            name: "Push Press",
            sets: "2 sets of 5 @ 90% of Push Press RM (Last set AMRAP)",
          },
          { name: "DB Press", sets: "3 sets of 10" },
          { name: "BB Upright Row", sets: "3 sets of 15" },
          { name: "Box Jump", sets: "3 sets of 5" },
        ],
      },
    ],
  },
  {
    week: 4,
    days: [
      {
        day: "Day 1",
        exercises: [
          {
            name: "Segment Clean (knee) + Clean",
            sets: "2 sets of 1+1 @ 90% of Clean RM",
          },
          {
            name: "Clean Pull on Riser",
            sets: "1 set of 3 @ 95%, 1 set of 3 @ 100%, 1 set of 3 @ 105%, 1 set of 3 @ 110% of Clean RM",
          },
          {
            name: "Pause Back Squat",
            sets: "1 set of 5, 1 set AMRAP @ 90% of Back Squat RM",
          },
          { name: "Weighted Planks", sets: "3 sets of 20-30sec" },
        ],
      },
      {
        day: "Day 2",
        exercises: [
          { name: "Power Clean", sets: "8 sets of 2 @ 65% of Clean RM" },
          { name: "Clean High-Pull", sets: "4 sets of 3 @ 70% of Clean RM" },
          { name: "Chin-ups", sets: "3 sets of 10" },
          { name: "Barbell Bent Row", sets: "3 sets of 15" },
          { name: "Walking Lunge", sets: "3 sets of 10/leg" },
        ],
      },
      {
        day: "Day 3",
        exercises: [
          {
            name: "Clean Pull + Clean",
            sets: "3 sets of 1+1 @ 90% of Clean RM",
          },
          {
            name: "Clean Segment Deadlift on Riser + Clean Deadlift on Riser",
            sets: "4 sets of 1+3 @ 90% of Clean RM",
          },
          {
            name: "Front Squat",
            sets: "1 set of 3, 1 set AMRAP @ 90% of Front Squat RM",
          },
          { name: "Hanging Leg Raise", sets: "3 sets to max" },
        ],
      },
      {
        day: "Day 4 (Optional)",
        exercises: [
          {
            name: "Push Press",
            sets: "1 set of 5, 1 set AMRAP @ 90% of Push Press RM",
          },
          { name: "Push-up", sets: "3 sets of 15" },
          { name: "Alternating KB Press", sets: "3 sets of 10/arm" },
          { name: "Box Jump", sets: "3 sets of 5" },
        ],
      },
    ],
  },
  {
    week: 5,
    days: [
      {
        day: "Day 1",
        exercises: [
          { name: "Clean", sets: "6 singles @ 80% of Clean RM (OTM)" },
          {
            name: "Clean Pull",
            sets: "3 sets of 3 @ 95%, 3 sets of 3 @ 100%, 2 sets of 3 @ 105% of Clean RM",
          },
          { name: "Back Squat", sets: "3 sets of 3 @ 90% of Back Squat RM" },
          { name: "Weighted Planks", sets: "3 sets of 20-30sec" },
        ],
      },
      {
        day: "Day 2",
        exercises: [
          { name: "Power Clean", sets: "10 sets of 2 @ 60% of Clean RM" },
          {
            name: "Block Clean High-Pull (knee)",
            sets: "4 sets of 3 @ 75% of Clean RM",
          },
          { name: "Pull-ups", sets: "3 sets of 10" },
          { name: "1-Arm DB Row", sets: "3 sets of 15/arm" },
          { name: "Step-up (unweighted)", sets: "3 sets of 10/leg" },
        ],
      },
      {
        day: "Day 3",
        exercises: [
          { name: "Clean", sets: "6 doubles @ 80% of Clean RM (OTM)" },
          {
            name: "Clean Pull",
            sets: "3 sets of 3 @ 95%, 3 sets of 3 @ 100%, 2 sets of 3 @ 105% of Clean RM",
          },
          { name: "Front Squat", sets: "3 sets of 2 @ 90% of Front Squat RM" },
          { name: "Hanging Leg Raise", sets: "3 sets to max" },
        ],
      },
      {
        day: "Day 4 (Optional)",
        exercises: [
          { name: "Push Press", sets: "3 sets of 3 @ 90% of Push Press RM" },
          { name: "DB Press", sets: "3 sets of 10" },
          { name: "BB Upright Row", sets: "3 sets of 15" },
          { name: "Box Jump", sets: "3 sets of 5" },
        ],
      },
    ],
  },
  {
    week: 6,
    days: [
      {
        day: "Day 1",
        exercises: [
          { name: "Clean", sets: "5 singles @ 85% of Clean RM (OTM)" },
          {
            name: "Clean Pull",
            sets: "3 sets of 3 @ 95%, 3 sets of 3 @ 100%, 2 sets of 2 @ 105%, 2 sets of 2 @ 110% of Clean RM",
          },
          { name: "Back Squat", sets: "2 sets of 3 @ 90% of Back Squat RM" },
          { name: "Weighted Planks", sets: "3 sets of 20-30sec" },
        ],
      },
      {
        day: "Day 2",
        exercises: [
          {
            name: "Power Clean",
            sets: "5 sets of 2 @ 60%, 5 sets of 2 @ 65% of Clean RM",
          },
          {
            name: "Block Clean High-Pull (knee)",
            sets: "2 sets of 3 @ 75%, 2 sets of 3 @ 80% of Clean RM",
          },
          { name: "Pull-ups", sets: "3 sets of 10" },
          { name: "1-Arm DB Row", sets: "3 sets of 15/arm" },
          { name: "Step-up (unweighted)", sets: "3 sets of 12/leg" },
        ],
      },
      {
        day: "Day 3",
        exercises: [
          { name: "Clean", sets: "5 doubles @ 85% of Clean RM (OTM)" },
          {
            name: "Clean Pull",
            sets: "3 sets of 3 @ 95%, 3 sets of 3 @ 100%, 2 sets of 2 @ 105%, 2 sets of 2 @ 110% of Clean RM",
          },
          { name: "Front Squat", sets: "2 sets of 2 @ 90% of Front Squat RM" },
          { name: "Hanging Leg Raise", sets: "3 sets to max" },
        ],
      },
      {
        day: "Day 4 (Optional)",
        exercises: [
          { name: "Push Press", sets: "2 sets of 3 @ 90% of Push Press RM" },
          { name: "DB Press", sets: "3 sets of 10" },
          { name: "BB Upright Row", sets: "3 sets of 15" },
          { name: "Box Jump", sets: "3 sets of 5" },
        ],
      },
    ],
  },
  {
    week: 7,
    days: [
      {
        day: "Day 1",
        exercises: [
          { name: "Clean", sets: "4 singles @ 90% of Clean RM (OTM)" },
          {
            name: "Clean Pull",
            sets: "2 sets of 2 @ 95%, 2 sets of 2 @ 100%, 2 sets of 2 @ 100%, 2 sets of 2 @ 100% of Clean RM",
          },
          { name: "Back Squat", sets: "1 set of 3 @ 90-95% of Back Squat RM" },
          { name: "Weighted Planks", sets: "3 sets of 20-30sec" },
        ],
      },
      {
        day: "Day 2",
        exercises: [
          { name: "Power Clean", sets: "10 sets of 2 @ 65% of Clean RM" },
          {
            name: "Block Clean High-Pull (knee)",
            sets: "3 sets of 3 @ 80% of Clean RM",
          },
          { name: "Pull-ups", sets: "3 sets of 10" },
          { name: "1-Arm DB Row", sets: "3 sets of 15/arm" },
          { name: "Step-up (unweighted)", sets: "3 sets of 14/leg" },
        ],
      },
      {
        day: "Day 3",
        exercises: [
          { name: "Clean", sets: "4 doubles @ 90% of Clean RM (OTM)" },
          {
            name: "Clean Pull",
            sets: "2 sets of 2 @ 95%, 2 sets of 2 @ 100%, 2 sets of 2 @ 100%, 2 sets of 2 @ 100% of Clean RM",
          },
          {
            name: "Front Squat",
            sets: "1 set of 2 @ 90-95% of Front Squat RM",
          },
          { name: "Hanging Leg Raise", sets: "3 sets to max" },
        ],
      },
      {
        day: "Day 4 (Optional)",
        exercises: [
          { name: "Power Clean", sets: "10 singles @ 65% of Clean RM (OTM)" },
          { name: "Push Press", sets: "1 set of 3 @ 90-95% of Push Press RM" },
          { name: "DB Press", sets: "3 sets of 10" },
          { name: "BB Upright Row", sets: "3 sets of 15" },
          { name: "Box Jump", sets: "3 sets of 5" },
        ],
      },
    ],
  },
  {
    week: 8,
    days: [
      {
        day: "Day 1",
        exercises: [
          {
            name: "Clean",
            sets: "1 single @ 70%, 1 single @ 75%, 1 single @ 80%, 3 singles @ 85% of Clean RM",
          },
          {
            name: "Clean + Front Squat",
            sets: "2 sets of 1+1 @ 70%, 2 sets of 1+1 @ 75%, 1 set of 1+1 @ 80% of Clean RM",
          },
          { name: "Back Squat", sets: "3 sets of 3 @ 75% of Back Squat RM" },
          { name: "Weighted Planks", sets: "3 sets of 20-30sec" },
        ],
      },
      {
        day: "Day 2",
        exercises: [
          {
            name: "Hang Clean (mid-thigh)",
            sets: "6 singles @ 60% of Clean RM",
          },
          { name: "Power Clean", sets: "5 sets of 2 @ 60% of Clean RM" },
          { name: "Clean Pull", sets: "3 sets of 2 @ 90% of Clean RM" },
        ],
      },
      {
        day: "Day 3 (Max Out Day)",
        exercises: [
          { name: "Clean", sets: "Work up to new 1RM" },
          {
            name: "Clean + Front Squat",
            sets: "Work up to heavy but comfortable weight",
          },
          {
            name: "Front Squat",
            sets: "1 set of 1 @ 90-95% of Front Squat RM",
          },
        ],
      },
      {
        day: "Day 4 (Optional - Active Recovery)",
        exercises: [
          { name: "Light technique work on cleans", sets: "" },
          { name: "Mobility and flexibility exercises", sets: "" },
          { name: "Low-intensity cardio (e.g., rowing, cycling)", sets: "" },
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
];

type User = "Zach" | "Jake";

function WorkoutProgram({ user }: { user: User }) {
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([]);
  const [expandedDays, setExpandedDays] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const storedProgress = localStorage.getItem(`workoutProgress-${user}`);
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, [user]);

  const toggleWeek = (week: number) => {
    setExpandedWeeks((prev) =>
      prev.includes(week) ? prev.filter((w) => w !== week) : [...prev, week]
    );
  };

  const toggleDay = (weekDay: string) => {
    setExpandedDays((prev) =>
      prev.includes(weekDay)
        ? prev.filter((d) => d !== weekDay)
        : [...prev, weekDay]
    );
  };

  const toggleExercise = (exerciseId: string) => {
    setProgress((prev) => {
      const newProgress = { ...prev, [exerciseId]: !prev[exerciseId] };
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
          key={week.week}
          className="overflow-hidden border-2 border-primary"
        >
          <CardHeader
            className="p-4 bg-primary text-primary-foreground cursor-pointer"
            onClick={() => toggleWeek(week.week)}
          >
            <CardTitle className="flex justify-between items-center">
              <span className="text-xl font-semibold">Week {week.week}</span>
              {expandedWeeks.includes(week.week) ? (
                <ChevronUp />
              ) : (
                <ChevronDown />
              )}
            </CardTitle>
          </CardHeader>
          {expandedWeeks.includes(week.week) && (
            <CardContent className="p-4">
              {week.days.map((day, index) => (
                <div key={day.day} className="mb-4 last:mb-0">
                  <button
                    onClick={() => toggleDay(`${week.week}-${day.day}`)}
                    className={`w-full p-2 rounded-md text-left font-semibold flex justify-between items-center ${
                      colors[index % colors.length]
                    } transition-colors`}
                  >
                    <span>{day.day}</span>
                    {expandedDays.includes(`${week.week}-${day.day}`) ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>
                  {expandedDays.includes(`${week.week}-${day.day}`) && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-1/2">Exercise</TableHead>
                          <TableHead>Sets/Reps/Intensity</TableHead>
                          <TableHead className="w-24">Completed</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {day.exercises.map((exercise, exerciseIndex) => {
                          const exerciseId = `${user}-${week.week}-${day.day}-${exerciseIndex}`;
                          return (
                            <TableRow key={exerciseIndex}>
                              <TableCell className="font-medium">
                                {exercise.name}
                              </TableCell>
                              <TableCell>{exercise.sets}</TableCell>
                              <TableCell>
                                <Checkbox
                                  checked={progress[exerciseId] || false}
                                  onCheckedChange={() =>
                                    toggleExercise(exerciseId)
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
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
    <div className="max-w-6xl mx-auto p-4 space-y-4">
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
      <Card className="mt-6 border-2 border-primary">
        <CardHeader className="bg-primary text-primary-foreground">
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-primary">
            <li>RM = Repetition Maximum</li>
            <li>OTM = On The Minute</li>
            <li>AMRAP = As Many Reps As Possible</li>
            <li>
              Always perform a proper warm-up before starting your workout
            </li>
            <li>Listen to your body and adjust weights or volume if needed</li>
            <li>Ensure proper form and technique throughout all exercises</li>
            <li>
              Stay hydrated and maintain proper nutrition to support your
              training
            </li>
            <li>Get adequate rest and recovery between workouts</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
