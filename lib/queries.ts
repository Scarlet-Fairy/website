import axios from "axios";
import { MutationFunction, QueryFunction } from "react-query";

import { CREATE_DEPLOY, GET_DEPLOY, GET_LOGS } from "./endpoints";
import {
  CreateDeployRequest,
  CreateDeployResponse,
  GetDeployResponse,
  Deploy,
  GetLogsResponse,
  Log,
} from "../type/deploy";

export const createDeployQuery: MutationFunction<
  CreateDeployResponse,
  CreateDeployRequest
> = async ({ name, gitRepo, envs }) => {
  const { data } = await axios.post(CREATE_DEPLOY, {
    name,
    gitRepo,
    envs,
  });

  return data;
};

export const getDeployQuery: (deployId: string) => QueryFunction<Deploy> =
  (deployId: string) => async () => {
    const { data } = await axios.get<GetDeployResponse>(GET_DEPLOY, {
      params: {
        deployId,
      },
    });

    return data.deploy;
  };

export const getLogsQuery: (query: {
  deployId: string;
  offset: number;
  size: number;
}) => QueryFunction<Array<Log>> =
  ({ deployId, offset, size }) =>
  async () => {
    const { data } = await axios.get<GetLogsResponse>(GET_LOGS, {
      params: {
        deployId,
        offset,
        size,
      },
    });

    return data.logs;
  };
