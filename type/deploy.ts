export type BuildStep = "UNKNOWN" | "CLONE" | "BUILD" | "PUSH";
export const Steps = ["CLONE", "BUILD", "PUSH"];

export type BuildStatus = "UNKNOWN" | "ERROR" | "LOADING" | "COMPLETED";

export interface Build {
  jobId: string;
  jobName: string;
  imageName: string;
  status: BuildStatus;
  steps: Array<{
    step: BuildStep;
    error: string;
  }>;
}

export interface Workload {
  jobId: string;
  jobName: string;
  envs: Record<string, string>;
  url: string;
}

export interface Deploy {
  id: string;
  name: string;
  gitRepo: string;
  build: Build;
  workload: Workload;
}

export interface Log {
  timestamp: string;
  body: string;
}

export interface CreateDeployRequest {
  gitRepo: string;
  name: string;
  envs: Record<string, string>;
}

export interface CreateDeployResponse {
  deployId: string;
}

export interface GetDeployRequest {
  name: string;
}

export interface GetDeployResponse {
  deploy: Deploy;
}

export interface GetLogsRequest {
  deployId: string;
  offset: number;
  size: number;
}

export interface GetLogsResponse {
  logs: Array<Log>;
}
