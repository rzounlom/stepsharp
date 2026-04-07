"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAllQuestions } from "@/lib/questions";
import type { Question } from "@/types/question";
import type {
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
  status: "idle",
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
    result.push(source[i % source.length]);
  }

  return result;
}

export function TestSessionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [state, setState] = useState<TestSessionState>(INITIAL_STATE);

  useEffect(() => {
    if (state.status !== "in_progress" || !state.config) {
      return;
    }

    const interval = window.setInterval(() => {
      setState((prev) => {
        if (prev.status !== "in_progress" || !prev.config) {
          return prev;
        }

        if (prev.blockTimeRemainingSeconds > 0) {
          return {
            ...prev,
            blockTimeRemainingSeconds: prev.blockTimeRemainingSeconds - 1,
          };
        }

        const hasMoreBlocks = prev.currentBlock < prev.config.blocks;
        return {
          ...prev,
          status: getStatusForTimeEnd(prev.status, hasMoreBlocks),
        };
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [state.config, state.status]);

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
        status: "in_progress",
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
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: Math.min(
          prev.currentQuestionIndex + 1,
          Math.max(prev.questions.length - 1, 0),
        ),
      }));
    }

    function goToPreviousQuestion() {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0),
      }));
    }

    function goToQuestion(index: number) {
      setState((prev) => ({
        ...prev,
        currentQuestionIndex: Math.min(
          Math.max(index, 0),
          Math.max(prev.questions.length - 1, 0),
        ),
      }));
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

    function nextBlock() {
      setState((prev) => {
        if (!prev.config) {
          return prev;
        }

        if (prev.currentBlock >= prev.config.blocks) {
          return {
            ...prev,
            status: "finished",
            blockTimeRemainingSeconds: 0,
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
        };
      });
    }

    function finishSession() {
      setState((prev) => ({
        ...prev,
        status: "finished",
        blockTimeRemainingSeconds: 0,
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
