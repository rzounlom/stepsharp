"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAllQuestions } from "@/lib/questions";
import type { Question } from "@/types/question";
import type {
  BlockCompleteReason,
  TestSessionConfig,
  TestSessionState,
  SessionStatus,
} from "@/types/test-session";

type TestSessionContextValue = TestSessionState & {
  startSession: (config: TestSessionConfig) => void;
  selectAnswer: (questionId: string, answer: string) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  goToQuestion: (index: number) => void;
  toggleFlag: (questionId: string) => void;
  skipTutorial: () => void;
  startBreak: () => void;
  endBreak: () => void;
  endBlockEarly: () => void;
  nextBlock: () => void;
  finishSession: () => void;
};

const INITIAL_STATE: TestSessionState = {
  config: null,
  questions: [],
  currentQuestionIndex: 0,
  currentBlock: 1,
  answers: {},
  flaggedQuestions: {},
  blockTimeRemainingSeconds: 0,
  tutorialTimeRemainingSeconds: 0,
  breakTimeRemainingSeconds: 0,
  initialBreakBankSeconds: 0,
  totalBreakSecondsUsed: 0,
  totalAddedFromTutorialSeconds: 0,
  totalAddedFromUnusedBlockSeconds: 0,
  status: "idle",
  blockCompleteReason: null,
};

const TestSessionContext = createContext<TestSessionContextValue | undefined>(
  undefined,
);

function getStatusForTimeEnd(
  currentStatus: SessionStatus,
  hasMoreBlocks: boolean,
): SessionStatus {
  if (currentStatus !== "in_progress") {
    return currentStatus;
  }

  return hasMoreBlocks ? "block_complete" : "finished";
}

function buildSessionQuestions(config: TestSessionConfig): Question[] {
  const source = getAllQuestions();
  if (source.length === 0) {
    return [];
  }

  const targetCount = config.blocks * config.questionsPerBlock;
  const result: Question[] = [];

  for (let i = 0; i < targetCount; i += 1) {
    const sourceQuestion = source[i % source.length];
    result.push({
      ...sourceQuestion,
      // Ensure every question is uniquely addressable within a session.
      id: `${sourceQuestion.id}__session_${String(i + 1).padStart(4, "0")}`,
    });
  }

  return result;
}

function getBlockIndexRange(
  currentBlock: number,
  questionsPerBlock: number,
  totalQuestions: number,
) {
  const start = Math.max(0, (currentBlock - 1) * questionsPerBlock);
  const end = Math.min(start + questionsPerBlock, totalQuestions);
  return { start, end };
}

export function TestSessionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [state, setState] = useState<TestSessionState>(INITIAL_STATE);

  useEffect(() => {
    if (!state.config) {
      return;
    }

    const interval = window.setInterval(() => {
      setState((prev) => {
        if (!prev.config) {
          return prev;
        }

        if (prev.status === "tutorial") {
          if (prev.tutorialTimeRemainingSeconds > 0) {
            return {
              ...prev,
              tutorialTimeRemainingSeconds: prev.tutorialTimeRemainingSeconds - 1,
            };
          }

          return { ...prev, status: "in_progress" };
        }

        if (prev.status === "break") {
          if (prev.breakTimeRemainingSeconds > 0) {
            return {
              ...prev,
              breakTimeRemainingSeconds: prev.breakTimeRemainingSeconds - 1,
              totalBreakSecondsUsed: prev.totalBreakSecondsUsed + 1,
            };
          }

          return { ...prev, status: "block_complete" };
        }

        if (prev.status !== "in_progress") {
          return prev;
        }

        if (prev.blockTimeRemainingSeconds > 0) {
          return {
            ...prev,
            blockTimeRemainingSeconds: prev.blockTimeRemainingSeconds - 1,
          };
        }

        const hasMoreBlocks = prev.currentBlock < prev.config.blocks;
        const nextStatus = getStatusForTimeEnd(prev.status, hasMoreBlocks);
        const blockCompleteReason: BlockCompleteReason =
          nextStatus === "block_complete" ? "timer_expired" : prev.blockCompleteReason;

        return {
          ...prev,
          status: nextStatus,
          blockCompleteReason,
        };
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [state.config]);

  const value = useMemo<TestSessionContextValue>(() => {
    function startSession(config: TestSessionConfig) {
      const sessionQuestions = buildSessionQuestions(config);
      setState({
        config,
        questions: sessionQuestions,
        currentQuestionIndex: 0,
        currentBlock: 1,
        answers: {},
        flaggedQuestions: {},
        blockTimeRemainingSeconds: config.minutesPerBlock * 60,
        tutorialTimeRemainingSeconds: config.tutorialMinutes * 60,
        breakTimeRemainingSeconds: config.minimumBreakMinutes * 60,
        initialBreakBankSeconds: config.minimumBreakMinutes * 60,
        totalBreakSecondsUsed: 0,
        totalAddedFromTutorialSeconds: 0,
        totalAddedFromUnusedBlockSeconds: 0,
        status: sessionQuestions.length > 0 ? "tutorial" : "finished",
        blockCompleteReason: null,
      });
    }

    function selectAnswer(questionId: string, answer: string) {
      setState((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: answer,
        },
      }));
    }

    function goToNextQuestion() {
      setState((prev) => {
        if (!prev.config) {
          return prev;
        }

        const { start, end } = getBlockIndexRange(
          prev.currentBlock,
          prev.config.questionsPerBlock,
          prev.questions.length,
        );
        const maxIndex = Math.max(end - 1, start);

        return {
          ...prev,
          currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, maxIndex),
        };
      });
    }

    function goToPreviousQuestion() {
      setState((prev) => {
        if (!prev.config) {
          return prev;
        }

        const { start } = getBlockIndexRange(
          prev.currentBlock,
          prev.config.questionsPerBlock,
          prev.questions.length,
        );

        return {
          ...prev,
          currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, start),
        };
      });
    }

    function goToQuestion(index: number) {
      setState((prev) => {
        if (!prev.config) {
          return prev;
        }

        const { start, end } = getBlockIndexRange(
          prev.currentBlock,
          prev.config.questionsPerBlock,
          prev.questions.length,
        );
        const maxIndex = Math.max(end - 1, start);

        return {
          ...prev,
          currentQuestionIndex: Math.min(Math.max(index, start), maxIndex),
        };
      });
    }

    function toggleFlag(questionId: string) {
      setState((prev) => ({
        ...prev,
        flaggedQuestions: {
          ...prev.flaggedQuestions,
          [questionId]: !prev.flaggedQuestions[questionId],
        },
      }));
    }

    function skipTutorial() {
      setState((prev) => {
        if (!prev.config || prev.status !== "tutorial") {
          return prev;
        }

        return {
          ...prev,
          status: "in_progress",
          breakTimeRemainingSeconds:
            prev.breakTimeRemainingSeconds + prev.tutorialTimeRemainingSeconds,
          totalAddedFromTutorialSeconds:
            prev.totalAddedFromTutorialSeconds + prev.tutorialTimeRemainingSeconds,
          tutorialTimeRemainingSeconds: 0,
        };
      });
    }

    function startBreak() {
      setState((prev) => {
        if (prev.status !== "block_complete" || prev.breakTimeRemainingSeconds <= 0) {
          return prev;
        }

        return {
          ...prev,
          status: "break",
        };
      });
    }

    function endBreak() {
      setState((prev) => {
        if (prev.status !== "break") {
          return prev;
        }

        return {
          ...prev,
          status: "block_complete",
        };
      });
    }

    function endBlockEarly() {
      setState((prev) => {
        if (!prev.config || prev.status !== "in_progress") {
          return prev;
        }

        const hasMoreBlocks = prev.currentBlock < prev.config.blocks;
        return {
          ...prev,
          status: hasMoreBlocks ? "block_complete" : "finished",
          breakTimeRemainingSeconds: hasMoreBlocks
            ? prev.breakTimeRemainingSeconds + prev.blockTimeRemainingSeconds
            : prev.breakTimeRemainingSeconds,
          totalAddedFromUnusedBlockSeconds: hasMoreBlocks
            ? prev.totalAddedFromUnusedBlockSeconds + prev.blockTimeRemainingSeconds
            : prev.totalAddedFromUnusedBlockSeconds,
          blockTimeRemainingSeconds: hasMoreBlocks ? 0 : prev.blockTimeRemainingSeconds,
          blockCompleteReason: hasMoreBlocks ? "ended_early" : null,
        };
      });
    }

    function nextBlock() {
      setState((prev) => {
        if (!prev.config) {
          return prev;
        }

        if (prev.status !== "block_complete" && prev.status !== "break") {
          return prev;
        }

        if (prev.currentBlock >= prev.config.blocks) {
          return {
            ...prev,
            status: "finished",
            blockTimeRemainingSeconds: 0,
            blockCompleteReason: null,
          };
        }

        const nextBlockNumber = prev.currentBlock + 1;
        const nextBlockStartIndex =
          (nextBlockNumber - 1) * prev.config.questionsPerBlock;

        return {
          ...prev,
          currentBlock: nextBlockNumber,
          currentQuestionIndex: Math.min(
            nextBlockStartIndex,
            Math.max(prev.questions.length - 1, 0),
          ),
          blockTimeRemainingSeconds: prev.config.minutesPerBlock * 60,
          status: "in_progress",
          blockCompleteReason: null,
        };
      });
    }

    function finishSession() {
      setState((prev) => ({
        ...prev,
        status: "finished",
        blockTimeRemainingSeconds: 0,
        blockCompleteReason: null,
      }));
    }

    return {
      ...state,
      startSession,
      selectAnswer,
      goToNextQuestion,
      goToPreviousQuestion,
      goToQuestion,
      toggleFlag,
      skipTutorial,
      startBreak,
      endBreak,
      endBlockEarly,
      nextBlock,
      finishSession,
    };
  }, [state]);

  return (
    <TestSessionContext.Provider value={value}>
      {children}
    </TestSessionContext.Provider>
  );
}

export function useTestSession() {
  const context = useContext(TestSessionContext);
  if (!context) {
    throw new Error("useTestSession must be used within a TestSessionProvider");
  }

  return context;
}
