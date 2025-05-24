import { elizaLogger as coreLogger } from '@elizaos/core';
import type { LogFn } from 'pino';

// Use actual LogFn parameter types to avoid overload mismatch
//type AcceptableArg = string | any[] | Record<string, unknown>
type LogMethod = (...args: any[]) => void;
type TupleLogMethod = (args: [string, ...any[]]) => void;

// Create a function that adapts a TupleLogMethod to a LogMethod
function adaptLogMethod(tupleMethod: TupleLogMethod): LogMethod {
  return function(msg: string, ...args: any[]) {
    return tupleMethod([msg, ...args]);
  };
}

const logger: Record<
  | 'trace'
  | 'debug'
  | 'success'
  | 'progress'
  | 'log'
  | 'info'
  | 'warn'
  | 'error'
  | 'fatal',
  LogMethod
> & { clear: () => void } = {
  trace: adaptLogMethod(([msg, ...rest]) => {
    coreLogger.trace.apply(coreLogger, [msg, ...rest]);
  }),
  debug: adaptLogMethod(([msg, ...rest]) => {
    coreLogger.debug.apply(coreLogger, [msg, ...rest]);
  }),
  success: adaptLogMethod(([msg, ...rest]) => {
    coreLogger.debug.apply(coreLogger, [msg, ...rest]);
  }),
  progress: adaptLogMethod(([msg, ...rest]) => {
    coreLogger.debug.apply(coreLogger, [msg, ...rest]);
  }),
  log: adaptLogMethod(([msg, ...rest]) => {
    coreLogger.info.apply(coreLogger, [msg, ...rest]);
  }),
  info:  adaptLogMethod(([msg, ...rest]) => {
    coreLogger.info.apply(coreLogger, [msg, ...rest]);
  }),
  warn:  adaptLogMethod(([msg, ...rest]) => {
    coreLogger.warn.apply(coreLogger, [msg, ...rest]);
  }),
  error:  adaptLogMethod(([msg, ...rest]) => {
    coreLogger.error.apply(coreLogger, [msg, ...rest]);
  }),
  fatal:  adaptLogMethod(([msg, ...rest]) => {
    coreLogger.fatal.apply(coreLogger, [msg, ...rest]);
  }),
  clear: () => coreLogger.clear(''), // call with dummy arg to satisfy "at least 1 argument" requirement
};

export { logger };
export const elizaLogger = logger;
export default logger;
