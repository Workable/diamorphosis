declare function diamorphosis(input: {
  configFolder?: string;
  configPath?: string;
  envFolder?: string;
  loadDotEnv?: string[];
}): void

declare namespace diamorphosis {}

export = diamorphosis;
