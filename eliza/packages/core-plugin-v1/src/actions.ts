import {
  composeActionExamples as coreComposeActionExamples,
  formatActionNames as coreFormatActionNames,
  formatActions as coreFormatActions,
} from '@elizaos/core';

import type { Action, ActionExample } from "./types.ts";

/**
 * Composes a set of example conversations based on provided actions and a specified count.
 * It randomly selects examples from the provided actions and formats them with generated names.
 * @param actionsData - An array of `Action` objects from which to draw examples.
 * @param count - The number of examples to generate.
 * @returns A string containing formatted examples of conversations.
 */
export const composeActionExamples = (actionsData: Action[], count: number) => {
  return coreComposeActionExamples(actionsData, count);
}

/**
 * Formats the names of the provided actions into a comma-separated string.
 * @param actions - An array of `Action` objects from which to extract names.
 * @returns A comma-separated string of action names.
 */
export function formatActionNames(actions: Action[]) {
  return coreFormatActionNames(actions);
}

/**
 * Formats the provided actions into a detailed string listing each action's name and description, separated by commas and newlines.
 * @param actions - An array of `Action` objects to format.
 * @returns A detailed string of actions, including names and descriptions.
 */
export function formatActions(actions: Action[]) {
  return coreFormatActions(actions);
}