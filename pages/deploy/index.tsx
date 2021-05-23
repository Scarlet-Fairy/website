import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useMutation } from "react-query";
import { MdAdd } from "react-icons/md";

import { CreateDeployRequest, CreateDeployResponse } from "../../type/deploy";
import Env from "../../components/deploy/Env";
import Layout from "../../components/Layout";
import { createDeployQuery } from "../../lib/queries";

const NewDeploy = () => {
  const [gitRepo, setGitRepo] = useState("");
  const [name, setName] = useState("");
  const [envs, setEnvs] = useState<Array<{ key: string; value: string }>>([]);

  const router = useRouter();

  const { mutate, data, error, isLoading, isError, isSuccess } = useMutation<
    CreateDeployResponse,
    unknown,
    CreateDeployRequest
  >("create_deploy", createDeployQuery);

  const handleDeploy = () => {
    const obj: Record<string, string> = {};

    envs.forEach((e) => (obj[e.key] = e.value));

    mutate({
      envs: obj,
      name,
      gitRepo,
    });
  };

  useEffect(() => {
    if (!isSuccess) return;

    router.push(`/deploy/${data?.deployId}`);
  }, [isSuccess, data]);

  return (
    <Layout>
      <div className="flex flex-col flex-1 justify-center items-center w-4/5">
        <div className="new-input-wrapper w-full mb-2">
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();

              handleDeploy();
            }}
          >
            <input
              className="new-input w-full"
              onChange={(e) => setGitRepo(e.currentTarget.value)}
              placeholder="Git Repo Url"
              value={gitRepo}
            />
          </form>
          <div className="new-submit" onClick={() => handleDeploy()}>
            Deploy
          </div>
        </div>
        <div className="flex flex-row justify-center mt-2 w-full">
          <div className="new-input-wrapper h-12 mr-2 flex-grow">
            <input
              className="new-input flex-grow w-full"
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Deploy Name"
              value={name}
            />
          </div>
          <div
            className="flex flex-col items-center justify-center ml-2"
            style={{
              flexGrow: 5,
            }}
          >
            {envs.map((env, i) => (
              <Env
                key={i}
                keyValue={envs.find((e) => e.key === env.key)?.key}
                valueValue={envs.find((e) => e.key === env.key)?.value}
                onDelete={() => setEnvs(envs.filter((e) => e.key !== env.key))}
                onKeyUpdate={(newKey) => {
                  const backValue = env.value;

                  const newEnv = envs.filter((e) => e.key !== env.key);
                  newEnv.push({
                    key: newKey,
                    value: backValue,
                  });

                  setEnvs(newEnv);
                }}
                onValueUpdate={(newValue) => {
                  const newEnv = envs.filter((e) => e.key !== env.key);
                  newEnv.push({
                    key: env.key,
                    value: newValue,
                  });

                  setEnvs(newEnv);
                }}
              />
            ))}
            <div
              className="container p-2 cursor-pointer hover:bg-gray-600 flex-grow flex flex-row justify-center items-center"
              onClick={() => {
                if (envs.find((e) => e.key === "")) {
                  return;
                }

                envs.push({
                  key: "",
                  value: "",
                });

                setEnvs([...envs]);
              }}
            >
              <MdAdd color="white" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewDeploy;
