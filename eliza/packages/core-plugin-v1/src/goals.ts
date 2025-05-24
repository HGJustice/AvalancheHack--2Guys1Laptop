import {
  getGoals as coreGetGoals,
  formatGoalsAsString as coreFormatGoalsAsString,
  updateGoal as coreUpdateGoal,
  createGoal as coreCreateGoal,
} from '@elizaos/core';

import type {
    IAgentRuntime,
    Goal,
    Objective,
    UUID,
} from "./types.ts";

export const getGoals = async ({
    runtime,
    roomId,
    userId,
    onlyInProgress = true,
    count = 5,
}: {
    runtime: IAgentRuntime;
    roomId: UUID;
    userId?: UUID;
    onlyInProgress?: boolean;
    count?: number;
}) => {
  return coreGetGoals({ runtime, roomId, userId, onlyInProgress, count })
}

export const formatGoalsAsString = ({ goals }: { goals: Goal[] }) => {
  return coreFormatGoalsAsString({ goals });
}

export const updateGoal = async ({
    runtime,
    goal,
}: {
    runtime: IAgentRuntime;
    goal: Goal;
}) => {
  return coreUpdateGoal({ runtime, goal });
}

export const createGoal = async ({
    runtime,
    goal,
}: {
    runtime: IAgentRuntime;
    goal: Goal;
}) => {
  return coreCreateGoal({ runtime, goal });
}