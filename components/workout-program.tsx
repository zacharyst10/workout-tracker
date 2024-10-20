"use client";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
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
import { workoutData } from "@/lib/workouts-data"; // Assuming this is where the data is now stored

type User = "Zach" | "Jake";

type UserMaxes = {
  clean: number;
  frontSquat: number;
  backSquat: number;
  press: number;
};

type AllUserMaxes = {
  [key in User]: UserMaxes;
};

const defaultUserMaxes: AllUserMaxes = {
  Zach: {
    clean: 315,
    frontSquat: 365,
    backSquat: 425,
    press: 205,
  },
  Jake: {
    clean: 285,
    frontSquat: 335,
    backSquat: 395,
    press: 185,
  },
};

function FloatingInfoButton({ activeUser }: { activeUser: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userMaxes, setUserMaxes] = useState<AllUserMaxes>(defaultUserMaxes);
  const [editMode, setEditMode] = useState(false);
  const [tempMaxes, setTempMaxes] = useState<UserMaxes>(
    defaultUserMaxes[activeUser]
  );

  useEffect(() => {
    const storedMaxes = localStorage.getItem("userMaxes");
    if (storedMaxes) {
      setUserMaxes(JSON.parse(storedMaxes));
    }
  }, []);

  useEffect(() => {
    setTempMaxes(userMaxes[activeUser]);
  }, [activeUser, userMaxes]);

  const handleInputChange = (exercise: keyof UserMaxes, value: string) => {
    setTempMaxes((prev) => ({
      ...prev,
      [exercise]: parseInt(value) || 0,
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

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 right-0 transition-all duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-[calc(100%-24px)]"
      }`}
    >
      <div className="flex items-stretch">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary text-primary-foreground p-1 rounded-l-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {isOpen ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
          <span className="sr-only">
            {isOpen ? "Hide" : "Show"} 1 RM Information
          </span>
        </button>
        <div className="bg-background border-y border-l border-input w-[300px] p-4 rounded-l-md shadow-lg">
          <h3 className="font-semibold mb-2">{activeUser}&apos;s 1 RM</h3>
          <Table>
            <TableBody>
              {Object.entries(userMaxes[activeUser]).map(
                ([exercise, weight]) => (
                  <TableRow key={exercise}>
                    <TableCell className="py-2 font-medium">
                      {exercise.charAt(0).toUpperCase() + exercise.slice(1)}
                    </TableCell>
                    <TableCell className="py-2 text-right">
                      {editMode ? (
                        <Input
                          type="number"
                          value={tempMaxes[exercise as keyof UserMaxes]}
                          onChange={(e) =>
                            handleInputChange(
                              exercise as keyof UserMaxes,
                              e.target.value
                            )
                          }
                          className="w-20 text-right"
                        />
                      ) : (
                        `${weight} lbs`
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end">
            {editMode ? (
              <>
                <Button onClick={saveMaxes} size="sm" className="mr-2">
                  Save
                </Button>
                <Button
                  onClick={() => setEditMode(false)}
                  variant="outline"
                  size="sm"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditMode(true)} size="sm">
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkoutProgram({ user }: { user: User }) {
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([]);
  const [expandedDays, setExpandedDays] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean[]>>({});
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

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

  const colors = [
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
                                                This stands for Repetition
                                                Maximum. It&apos;s the maximum
                                                weight you can lift for a given
                                                number of repetitions.
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
      <FloatingInfoButton activeUser={activeTab} />
    </div>
  );
}
