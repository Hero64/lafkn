import { LAFKN_CONTEXT, LAFKN_CONTEXT_VALUE } from '../constants/env.constants';

export const enableBuildEnvVariable = () => {
  process.env[LAFKN_CONTEXT] = LAFKN_CONTEXT_VALUE;
};

export const isBuildEnvironment = () => {
  return process.env[LAFKN_CONTEXT] === LAFKN_CONTEXT_VALUE;
};
