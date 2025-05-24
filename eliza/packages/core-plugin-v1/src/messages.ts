import {
  getActorDetails as coreGetActorDetails,
  formatActors as coreFormatActors,
  formatMessages as coreFormatMessages,
  formatTimestamp as coreFormatTimestamp,
} from '@elizaos/core';

import type {
    IAgentRuntime,
    Actor,
    Content,
    Memory,
    UUID,
} from "./types.ts";

/**
 * Get details for a list of actors.
 */
export async function getActorDetails({
    runtime,
    roomId,
}: {
    runtime: IAgentRuntime;
    roomId: UUID;
}) {
  return coreGetActorDetails({ runtime, roomId });
}

/**
 * Format actors into a string
 * @param actors - list of actors
 * @returns string
 */
export function formatActors({ actors }: { actors: Actor[] }) {
  return coreFormatActors({ actors });
}

/**
 * Format messages into a string
 * @param messages - list of messages
 * @param actors - list of actors
 * @returns string
 */
export const formatMessages = ({
    messages,
    actors,
}: {
    messages: Memory[];
    actors: Actor[];
}) => {
  return coreFormatMessages({ messages, actors });
}

export const formatTimestamp = (messageDate: number) => {
  return coreFormatTimestamp(messageDate)
}