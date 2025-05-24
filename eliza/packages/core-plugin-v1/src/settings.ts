import {
  findNearestEnvFile as coreFindNearestEnvFile,
  configureSettings as coreConfigureSettings,
  loadEnvConfig as coreLoadEnvConfig,
  hasEnvVariable as coreHasEnvVariable,
  settings as coreSettings,
  getEnvVariable as coreGetEnvVariable,
} from '@elizaos/core';
import type { IAgentRuntime, State, Memory } from "./types.ts";

interface Settings {
    [key: string]: string | undefined;
}

interface NamespacedSettings {
    [namespace: string]: Settings;
}

/**
 * Recursively searches for a .env file starting from the current directory
 * and moving up through parent directories (Node.js only)
 * @param {string} [startDir=process.cwd()] - Starting directory for the search
 * @returns {string|null} Path to the nearest .env file or null if not found
 */
export function findNearestEnvFile(startDir = process.cwd()) {
  return coreFindNearestEnvFile(startDir);
}

/**
 * Configures environment settings for browser usage
 * @param {Settings} settings - Object containing environment variables
 */
export function configureSettings(settings: Settings) {
  return coreConfigureSettings(settings);
}

/**
 * Loads environment variables from the nearest .env file in Node.js
 * or returns configured settings in browser
 * @returns {Settings} Environment variables object
 * @throws {Error} If no .env file is found in Node.js environment
 */
export function loadEnvConfig(): Settings {
  return coreLoadEnvConfig()
}

/**
 * Gets a specific environment variable
 * @param {string} key - The environment variable key
 * @param {string} [defaultValue] - Optional default value if key doesn't exist
 * @returns {string|undefined} The environment variable value or default value
 */
export function getEnvVariable(
    key: string,
    defaultValue?: string
): string | undefined {
  return coreGetEnvVariable(key, defaultValue);
}

/**
 * Checks if a specific environment variable exists
 * @param {string} key - The environment variable key
 * @returns {boolean} True if the environment variable exists
 */
export function hasEnvVariable(key: string): boolean {
  return coreHasEnvVariable(key);
}

// Initialize settings based on environment
export const settings: Settings = coreSettings;

export default settings;
