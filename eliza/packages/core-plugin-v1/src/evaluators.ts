import {
  evaluationTemplate as coreEvaluationTemplate,
  formatEvaluatorNames as coreFormatEvaluatorNames,
  formatEvaluators as coreFormatEvaluators,
  formatEvaluatorExamples as coreFormatEvaluatorExamples,
  formatEvaluatorExampleDescriptions as coreFormatEvaluatorExampleDescriptions,
} from '@elizaos/core';

import type { ActionExample, Evaluator } from "./types.ts";

/**
 * Template used for the evaluation generateText.
 */
export const evaluationTemplate = coreEvaluationTemplate;

/**
 * Formats the names of evaluators into a comma-separated list, each enclosed in single quotes.
 * @param evaluators - An array of evaluator objects.
 * @returns A string that concatenates the names of all evaluators, each enclosed in single quotes and separated by commas.
 */
export function formatEvaluatorNames(evaluators: Evaluator[]) {
  return coreFormatEvaluatorNames(evaluators);
}

/**
 * Formats evaluator details into a string, including both the name and description of each evaluator.
 * @param evaluators - An array of evaluator objects.
 * @returns A string that concatenates the name and description of each evaluator, separated by a colon and a newline character.
 */
export function formatEvaluators(evaluators: Evaluator[]) {
  return coreFormatEvaluators(evaluators);
}

/**
 * Formats evaluator examples into a readable string, replacing placeholders with generated names.
 * @param evaluators - An array of evaluator objects, each containing examples to format.
 * @returns A string that presents each evaluator example in a structured format, including context, messages, and outcomes, with placeholders replaced by generated names.
 */
export function formatEvaluatorExamples(evaluators: Evaluator[]) {
  return coreFormatEvaluatorExamples(evaluators);
}

/**
 * Generates a string summarizing the descriptions of each evaluator example.
 * @param evaluators - An array of evaluator objects, each containing examples.
 * @returns A string that summarizes the descriptions for each evaluator example, formatted with the evaluator name, example number, and description.
 */
export function formatEvaluatorExampleDescriptions(evaluators: Evaluator[]) {
  return coreFormatEvaluatorExampleDescriptions(evaluators);
}