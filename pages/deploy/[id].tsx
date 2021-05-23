import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { MoonLoader } from "react-spinners";

import Layout from "../../components/Layout";
import { getDeployQuery } from "../../lib/queries";
import { useCreateDeployQuery } from "../../hooks/useCreateDeployQuery";

interface StateProps {}

const Run: React.FC<StateProps> = () => {
  const router = useRouter();
  router.

  const { data: deploy, isLoading: isGetDeployLoading } = useQuery(
    ["get_deploy", name],
    getDeployQuery(name),
    {
      enabled: !!name,
      refetchInterval: 500,
    }
  );

  useEffect(() => {
    if (!name || !gitRepo || !envs) return;

    mutate({
      name,
      gitRepo,
      envs,
    });
  }, [name, gitRepo, envs]);

  return (
    <Layout>
      {isGetDeployLoading || !deploy ? (
        <MoonLoader color={"#ffffff"} speedMultiplier={0.5} />
      ) : (
        <div className="p-5 flex flex-col items-center justify-center">
          <div className="container my-2 text-white font-bold text-2xl text-left">
            {deploy.name}
          </div>
          <div className="container my-2 flex flex-row justify-center items-center">
            Status: {deploy.build.status}
          </div>
          <div className="container flex flex-col justify-center items-center"></div>
        </div>
      )}
    </Layout>
  );
};

export default Run;
