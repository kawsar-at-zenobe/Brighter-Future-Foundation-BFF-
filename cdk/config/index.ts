import type {
  StackContextMap,
  StackContextProps,
} from './context-config.interface';
import { LiveConfig } from './context-config-live';
import { StageConfig } from './context-config-stage';
import { TestConfig } from './context-config-test';

export type { ContextProps } from './context-config.interface';

const configurationContexts: StackContextMap = {
  test: TestConfig,
  stage: StageConfig,
  live: LiveConfig,
};

export const StackContext = (configContext: string): StackContextProps => {
  const config: StackContextProps = configurationContexts[configContext];

  if (config) {
    return config;
  }

  throw new Error(
    'Missing configuration context. Provide a configuration context DEPLOY_STAGE environment variable'
  );
};
