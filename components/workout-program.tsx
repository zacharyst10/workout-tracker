/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  X,
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
  const [progress, setProgress] = useState<Record<string, boolean[]>>({});
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
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
                <ChevronUp />
              ) : (
                <ChevronDown />
              )}
            </CardTitle>
          </CardHeader>
          {expandedWeeks.includes(week.number) && (
            <CardContent className="p-4 bg-background/80 backdrop-blur-sm">
              {week.days.map((day, dayIndex) => (
                <div key={day.name} className="mb-4 last:mb-0">
                  <button
                    onClick={() => toggleDay(`${week.number}-${day.name}`)}
                    className={`w-full p-2 rounded-md text-left font-semibold flex justify-between items-center ${
                      dayColors[dayIndex % dayColors.length]
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
                              {day.exercises.map((exercise, exerciseIndex) => {
                                const exerciseId = `${user}-${week.number}-${day.name}-${exerciseIndex}`;
                                return (
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
                                              open={isTooltipOpen}
                                              onOpenChange={setIsTooltipOpen}
                                            >
                                              <TooltipTrigger asChild>
                                                <button
                                                  onClick={() =>
                                                    setIsTooltipOpen(true)
                                                  }
                                                  className="focus:outline-none"
                                                >
                                                  <HelpCircle className="h-4 w-4 flex-shrink-0 text-muted-foreground cursor-help" />
                                                </button>
                                              </TooltipTrigger>
                                              <TooltipContent
                                                side="top"
                                                className="max-w-[280px] sm:max-w-sm p-4"
                                              >
                                                <button
                                                  onClick={() =>
                                                    setIsTooltipOpen(false)
                                                  }
                                                  className="absolute top-2 right-2 focus:outline-none"
                                                >
                                                  <X className="h-4 w-4" />
                                                </button>
                                                <p className="font-bold mb-2">
                                                  RM (Rep Max)
                                                </p>
                                                <p>
                                                  RM stands for "rep max" and
                                                  means you'll take the exercise
                                                  up to a maximum weight for the
                                                  prescribed reps, e.g. 3RM,
                                                  5RM, 1RM. If percentages
                                                  follow an RM prescription,
                                                  they are of that day's RM, not
                                                  of the athlete's current 1RM.
                                                  For example: 3RM, 90% x 3 x 2
                                                  This would mean taking the
                                                  exercise up to a max weight
                                                  for 3 reps, then doing 2 more
                                                  sets of 3 at 90% of that
                                                  maximum weight. Sometimes it
                                                  will be noted alongside RMs
                                                  that they should not be
                                                  absolute max testing on that
                                                  day, but very challenging.
                                                </p>
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
                                            {exercise.isRM && i === 0 ? (
                                              <Input
                                                type="number"
                                                value={
                                                  rmInputs[exerciseId] || ""
                                                }
                                                onChange={(e) =>
                                                  handleRmInput(
                                                    exerciseId,
                                                    e.target.value
                                                  )
                                                }
                                                className="w-16 h-8 text-xs"
                                                placeholder="RM"
                                              />
                                            ) : (
                                              <>
                                                {rmInputs[exerciseId] && (
                                                  <div className="text-xs text-muted-foreground">
                                                    {
                                                      exercise.sets[i]
                                                        .percentage
                                                    }
                                                    %
                                                  </div>
                                                )}
                                                <div className="text-xs font-medium">
                                                  {calculateWeight(
                                                    exercise.name,
                                                    exercise.sets[i].percentage,
                                                    rmInputs[exerciseId]
                                                  ) ?? "-"}{" "}
                                                  lbs
                                                </div>
                                              </>
                                            )}
                                            <Checkbox
                                              checked={
                                                progress[exerciseId]?.[i] ||
                                                false
                                              }
                                              onCheckedChange={() =>
                                                toggleSet(exerciseId, i)
                                              }
                                            />
                                          </div>
                                        ) : null}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                );
                              })}
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
