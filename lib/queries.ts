import axios from "axios";
import { MutationFunction, QueryFunction } from "react-query";

import { CREATE_DEPLOY, GET_DEPLOY } from "./endpoints";
import {
  CreateDeployRequest,
  CreateDeployResponse,
  GetDeployResponse,
  Deploy,
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

export const getDeployQuery: (name: string) => QueryFunction<Deploy> =
  (name: string) => async () => {
    const { data } = await axios.get<GetDeployResponse>(GET_DEPLOY, {
      params: {
        name,
      },
    });

    return data.deploy;
  };
