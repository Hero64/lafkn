import { ALICANTO_CONTEXT, ALICANTO_CONTEXT_VALUE } from '../constants/env.constants';

export const enableBuildEnvVariable = () => {
  process.env[ALICANTO_CONTEXT] = ALICANTO_CONTEXT_VALUE;
};

export const isBuildEnvironment = () => {
  return process.env[ALICANTO_CONTEXT] === ALICANTO_CONTEXT_VALUE;
};
