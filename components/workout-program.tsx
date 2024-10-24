/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Dumbbell,
  Minus,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { workoutData } from "@/lib/workouts-data";
import confetti from "canvas-confetti";

type User = "Zach" | "Jake";

type UserMaxes = {
  clean: number;
  frontSquat: number;
  backSquat: number;
  press: number;
};

type AllUserMaxes = {
  Zach: UserMaxes;
  Jake: UserMaxes;
};

const defaultUserMaxes: AllUserMaxes = {
  Zach: { clean: 225, frontSquat: 225, backSquat: 315, press: 135 },
  Jake: { clean: 185, frontSquat: 185, backSquat: 275, press: 115 },
};

type RMInput = {
  [key: string]: number;
};
function MaxesDrawer({ activeUser }: { activeUser: User }) {
  const [userMaxes, setUserMaxes] = useState<AllUserMaxes>(defaultUserMaxes);
  const [editMode, setEditMode] = useState(false);
  const [tempMaxes, setTempMaxes] = useState<UserMaxes>(
    defaultUserMaxes[activeUser]
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedMaxes = localStorage.getItem("userMaxes");
    if (storedMaxes) {
      setUserMaxes(JSON.parse(storedMaxes));
    }
  }, []);

  useEffect(() => {
    setTempMaxes(userMaxes[activeUser]);
  }, [activeUser, userMaxes]);

  const handleInputChange = (exercise: keyof UserMaxes, value: number) => {
    setTempMaxes((prev) => ({
      ...prev,
      [exercise]: value,
    }));
  };

  const saveMaxes = () => {
    const newUserMaxes = {
      ...userMaxes,
      [activeUser]: tempMaxes,
    };
    setUserMaxes(newUserMaxes);
    localStorage.setItem("userMaxes", JSON.stringify(newUserMaxes));
    setEditMode(false);
  };

  const incrementValue = (exercise: keyof UserMaxes) => {
    setTempMaxes((prev) => ({
      ...prev,
      [exercise]: prev[exercise] + 5,
    }));
  };

  const decrementValue = (exercise: keyof UserMaxes) => {
    setTempMaxes((prev) => ({
      ...prev,
      [exercise]: Math.max(0, prev[exercise] - 5),
    }));
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full p-0"
        >
          <Dumbbell className="h-6 w-6" />
          <span className="sr-only">View 1 RM Information</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh] sm:h-auto">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{activeUser}&apos;s 1 RM Information</DrawerTitle>
            <DrawerDescription>
              View and edit your one-rep max values.
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="h-[50vh] px-4">
            <div className="space-y-6 pb-4">
              {Object.entries(tempMaxes).map(([exercise, weight]) => (
                <div key={exercise} className="space-y-2">
                  <Label htmlFor={exercise} className="text-base font-medium">
                    {exercise.charAt(0).toUpperCase() + exercise.slice(1)}
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        decrementValue(exercise as keyof UserMaxes)
                      }
                      disabled={!editMode}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      id={exercise}
                      type="number"
                      inputMode="numeric"
                      value={weight}
                      onChange={(e) =>
                        handleInputChange(
                          exercise as keyof UserMaxes,
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="flex-1 text-center text-lg"
                      disabled={!editMode}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        incrementValue(exercise as keyof UserMaxes)
                      }
                      disabled={!editMode}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <DrawerFooter>
            {editMode ? (
              <>
                <Button onClick={saveMaxes}>Save Changes</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setTempMaxes(userMaxes[activeUser]);
                    setEditMode(false);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditMode(true)}>Edit Maxes</Button>
            )}
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function WorkoutProgram({
  user,
  userMaxes,
}: {
  user: User;
  userMaxes: UserMaxes;
}) {
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([]);
  const [expandedDays, setExpandedDays] = useState<string[]>([]);
  const [expandedExercises, setExpandedExercises] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean[]>>({});
  const [rmInputs, setRmInputs] = useState<RMInput>({});

  useEffect(() => {
    const storedProgress = localStorage.getItem(`workoutProgress-${user}`);
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
    const storedRmInputs = localStorage.getItem(`rmInputs-${user}`);
    if (storedRmInputs) {
      setRmInputs(JSON.parse(storedRmInputs));
    }
  }, [user]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#4CAF50", "#2196F3", "#9C27B0", "#FF9800"],
    });
  };

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

  const toggleExercise = (exerciseId: string) => {
    setExpandedExercises((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const isExerciseCompleted = (exerciseId: string, totalSets: number) => {
    const exerciseSets = progress[exerciseId] || [];
    return (
      exerciseSets.length === totalSets && exerciseSets.every((set) => set)
    );
  };

  const toggleSet = (
    exerciseId: string,
    setIndex: number,
    totalSets: number
  ) => {
    setProgress((prev) => {
      const exerciseSets = prev[exerciseId] || Array(totalSets).fill(false);
      const newExerciseSets = [...exerciseSets];
      newExerciseSets[setIndex] = !newExerciseSets[setIndex];
      const newProgress = { ...prev, [exerciseId]: newExerciseSets };

      // Check if this was the last set to complete the exercise
      const wasIncomplete = exerciseSets.some((set) => !set);
      const isNowComplete = newExerciseSets.every((set) => set);

      if (wasIncomplete && isNowComplete) {
        // Trigger confetti and collapse exercise
        setTimeout(() => {
          triggerConfetti();
          setExpandedExercises((prev) =>
            prev.filter((id) => id !== exerciseId)
          );
        }, 300);
      }

      localStorage.setItem(
        `workoutProgress-${user}`,
        JSON.stringify(newProgress)
      );
      return newProgress;
    });
  };

  const getGradientColor = (index: number, total: number) => {
    const hue = (index / total) * 60 + 180; // Gradient from 180 (cyan) to 240 (blue)
    return `hsl(${hue}, 70%, 85%)`; // Higher lightness (85%) for pastel colors
  };

  const calculateWeight = (
    exercise: string,
    percentage: number,
    rmInput?: number
  ): number | null => {
    if (exercise.toLowerCase().includes("rm") && !rmInput) {
      return null;
    }
    if (rmInput) {
      return Math.round((percentage / 100) * rmInput);
    }
    const maxKey = exercise.toLowerCase().includes("squat")
      ? exercise.toLowerCase().includes("front")
        ? "frontSquat"
        : "backSquat"
      : exercise.toLowerCase().includes("clean")
      ? "clean"
      : exercise.toLowerCase().includes("press")
      ? "press"
      : null;

    if (!maxKey) return 0;

    const max = userMaxes[maxKey as keyof UserMaxes];
    return Math.round((percentage / 100) * max);
  };

  const handleRmInput = (exerciseId: string, value: string) => {
    const newRmInputs = { ...rmInputs, [exerciseId]: parseInt(value) || 0 };
    setRmInputs(newRmInputs);
    localStorage.setItem(`rmInputs-${user}`, JSON.stringify(newRmInputs));
  };

  const dayColors = [
    "bg-pink-100 hover:bg-pink-200",
    "bg-purple-100 hover:bg-purple-200",
    "bg-blue-100 hover:bg-blue-200",
    "bg-green-100 hover:bg-green-200",
    "bg-yellow-100 hover:bg-yellow-200",
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4 text-primary">
        {user}&apos;s Workout Program
      </h2>
      {workoutData.map((week, weekIndex) => (
        <Card
          key={week.number}
          className="overflow-hidden border-2 border-primary"
          style={{
            background: `linear-gradient(to bottom, ${getGradientColor(
              weekIndex,
              workoutData.length
            )}, ${getGradientColor(weekIndex + 1, workoutData.length)})`,
            borderColor: "transparent",
          }}
        >
          <CardHeader
            className="p-4 bg-background/40 backdrop-blur-sm text-primary cursor-pointer"
            onClick={() => toggleWeek(week.number)}
          >
            <CardTitle className="flex justify-between items-center">
              <span className="text-xl font-semibold">Week {week.number}</span>
              {expandedWeeks.includes(week.number) ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </CardTitle>
          </CardHeader>
          {expandedWeeks.includes(week.number) && (
            <CardContent className="p-4 bg-background/80 backdrop-blur-sm">
              {week.days.map((day, dayIndex) => (
                <div key={day.name} className="mb-6 last:mb-0">
                  <button
                    onClick={() => toggleDay(`${week.number}-${day.name}`)}
                    className={`w-full p-3 rounded-md text-left font-semibold flex justify-between items-center ${
                      dayColors[dayIndex % dayColors.length]
                    } transition-colors`}
                  >
                    <span className="text-lg">{day.name}</span>
                    <div className="flex items-center text-sm">
                      <span className="mr-4">AVG {day.avgIntensity}%</span>
                      <span className="mr-2">VOL {day.totalVolume}</span>
                      {expandedDays.includes(`${week.number}-${day.name}`) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </button>
                  {expandedDays.includes(`${week.number}-${day.name}`) && (
                    <div className="mt-4 space-y-6">
                      {day.exercises.map((exercise, exerciseIndex) => {
                        const exerciseId = `${user}-${week.number}-${day.name}-${exerciseIndex}`;
                        const isCompleted = isExerciseCompleted(
                          exerciseId,
                          exercise.sets.length
                        );
                        const isExpanded =
                          expandedExercises.includes(exerciseId);

                        return (
                          <Card
                            key={exerciseId}
                            className={`overflow-hidden transition-all duration-300 ${
                              isCompleted ? "bg-green-50" : ""
                            }`}
                          >
                            <CardHeader
                              className={`py-2 px-4 cursor-pointer ${
                                isCompleted ? "bg-green-100" : "bg-muted"
                              }`}
                              onClick={() => toggleExercise(exerciseId)}
                            >
                              <CardTitle className="text-base flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span>{exercise.name}</span>
                                  {exercise.isRM && (
                                    <Badge variant="secondary">RM</Badge>
                                  )}
                                  {isCompleted && (
                                    <Badge
                                      variant="success"
                                      className="bg-green-500 text-white"
                                    >
                                      Completed
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  {exercise.isRM && (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <HelpCircle className="h-5 w-5 text-muted-foreground cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent
                                          side="top"
                                          className="max-w-[280px] p-4"
                                        >
                                          <p className="font-bold mb-2">
                                            RM (Rep Max)
                                          </p>
                                          <p>
                                            This stands for Repetition Maximum.
                                            It's the maximum weight you can lift
                                            for a given number of repetitions.
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}
                                  {isExpanded ? (
                                    <ChevronUp className="h-5 w-5" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5" />
                                  )}
                                </div>
                              </CardTitle>
                            </CardHeader>
                            {isExpanded && (
                              <CardContent className="p-0">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="w-[100px] text-center">
                                        Set
                                      </TableHead>
                                      <TableHead className="w-[100px] text-center">
                                        Reps
                                      </TableHead>
                                      <TableHead className="w-[100px] text-center">
                                        %RM
                                      </TableHead>
                                      <TableHead className="text-center">
                                        Weight
                                      </TableHead>
                                      <TableHead className="w-[100px] text-center">
                                        Done
                                      </TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {exercise.sets.map((set, setIndex) => (
                                      <TableRow key={setIndex}>
                                        <TableCell className="text-center font-medium">
                                          {setIndex + 1}
                                        </TableCell>
                                        <TableCell className="text-center">
                                          {set.reps}
                                        </TableCell>
                                        <TableCell className="text-center">
                                          {set.percentage}%
                                        </TableCell>
                                        <TableCell className="text-center">
                                          {exercise.isRM && setIndex === 0 ? (
                                            <Input
                                              type="number"
                                              value={rmInputs[exerciseId] || ""}
                                              onChange={(e) =>
                                                handleRmInput(
                                                  exerciseId,
                                                  e.target.value
                                                )
                                              }
                                              className="w-24 h-8 text-sm mx-auto"
                                              placeholder="RM (lbs)"
                                            />
                                          ) : (
                                            <span className="font-semibold">
                                              {calculateWeight(
                                                exercise.name,
                                                set.percentage,
                                                rmInputs[exerciseId]
                                              ) ?? "-"}{" "}
                                              lbs
                                            </span>
                                          )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                          <Checkbox
                                            checked={
                                              progress[exerciseId]?.[
                                                setIndex
                                              ] || false
                                            }
                                            onCheckedChange={() =>
                                              toggleSet(
                                                exerciseId,
                                                setIndex,
                                                exercise.sets.length
                                              )
                                            }
                                            className="mx-auto"
                                          />
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </CardContent>
                            )}
                          </Card>
                        );
                      })}
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
  const [userMaxes, setUserMaxes] = useState<AllUserMaxes>(defaultUserMaxes);

  useEffect(() => {
    const storedTab = localStorage.getItem("activeWorkoutTab") as User | null;
    if (storedTab) {
      setActiveTab(storedTab);
    }

    const storedMaxes = localStorage.getItem("userMaxes");
    if (storedMaxes) {
      setUserMaxes(JSON.parse(storedMaxes));
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
          <WorkoutProgram user="Zach" userMaxes={userMaxes.Zach} />
        </TabsContent>
        <TabsContent value="Jake">
          <WorkoutProgram user="Jake" userMaxes={userMaxes.Jake} />
        </TabsContent>
      </Tabs>
      <MaxesDrawer activeUser={activeTab} />
    </div>
  );
}
