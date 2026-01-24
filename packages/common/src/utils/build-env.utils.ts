import { LAFKEN_CONTEXT, LAFKEN_CONTEXT_VALUE } from '../constants/env.constants';

export const enableBuildEnvVariable = () => {
  process.env[LAFKEN_CONTEXT] = LAFKEN_CONTEXT_VALUE;
};

export const isBuildEnvironment = () => {
  return process.env[LAFKEN_CONTEXT] === LAFKEN_CONTEXT_VALUE;
};
