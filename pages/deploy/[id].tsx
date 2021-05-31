import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import Loader from "react-loader-spinner";

import Layout from "../../components/Layout";
import { getDeployQuery, getLogsQuery } from "../../lib/queries";
import { useCreateDeployQuery } from "../../hooks/useCreateDeployQuery";
import { MdCached, MdDone, MdErrorOutline } from "react-icons/md";
import { Deploy, Log, Steps } from "../../type/deploy";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Logs from "../../components/deploy/Logs";

interface StateProps {}

const Run: React.FC<StateProps> = () => {
  const [hasToFetch, setHasToFetch] = useState(true);
  const router = useRouter();
  const { id } = useCreateDeployQuery(router.query as Record<string, string>);

  const {
    data: deploy,
    isLoading: isLoadingGetDeploy,
    isError: isErrorGetDeploy,
    error: errorGetDeploy,
  } = useQuery<Deploy, AxiosError>("get_deploy", getDeployQuery(id), {
    enabled: !!id && hasToFetch,
    refetchInterval: 1000,
  });

  useEffect(() => {
    toast(errorGetDeploy?.response?.data?.message || errorGetDeploy?.message, {
      type: "error",
    });
  }, [isErrorGetDeploy, errorGetDeploy]);

  const {
    data: logs,
    isLoading: isLoadingGetLogs,
    isError: isErrorGetLogs,
    error: errorGetLogs,
  } = useQuery<Array<Log>, AxiosError>(
    "get_logs",
    getLogsQuery({
      deployId: deploy?.id as string,
      offset: 0,
      size: 50,
    }),
    {
      enabled: !!deploy && !!deploy.workload.jobId,
    }
  );

  useEffect(() => {
    toast(errorGetLogs?.response?.data?.message || errorGetLogs?.message, {
      type: "error",
    });
  }, [isErrorGetLogs, errorGetLogs]);

  return (
    <Layout>
      {isLoadingGetDeploy || !deploy ? (
        <Loader color={"#ffffff"} type={"Oval"} />
      ) : (
        <div className="w-full flex flex-row items-center justify-center">
          <div className="p-10 w-4/5 flex flex-col items-center justify-center">
            <div className="my-5 pl-3 text-white font-bold text-5xl text-left flex flex-row justify-left items-center w-full">
              {deploy.name}
            </div>
            <div className="container my-2 py-4 px-5 flex flex-row justify-start items-end">
              <label className="font-bold text-2xl mr-2">ID:</label>
              {deploy.id}
            </div>
            <div className="container my-2 py-4 px-5 flex flex-row justify-start items-end">
              <label className="font-bold text-2xl mr-2">Build name:</label>
              {deploy.build.jobName}
            </div>
            <div className="container my-2 py-4 px-5 flex flex-row justify-start items-end">
              <label className="font-bold text-2xl mr-2">Build status:</label>
              {deploy.build.status}
            </div>
            <div className="container my-2 py-4 px-5 flex flex-col justify-start items-start text-white">
              <div className="font-bold text-3xl mb-4">Build Steps</div>
              {Steps.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-row items-center justify-center"
                >
                  <div className="mx-2">
                    {!!deploy.build.steps.find((step) => step.step === s) ? (
                      deploy.build.steps.find((step) => step.step === s)
                        ?.error ? (
                        <MdErrorOutline size={"20px"} color={"#ffffff"} />
                      ) : (
                        <MdDone size={"20px"} color={"#ffffff"} />
                      )
                    ) : deploy.build.steps.find((step) => !!step.error) ? (
                      <div
                        style={{
                          display: "block",
                          width: "20px",
                          height: "20px",
                        }}
                      ></div>
                    ) : (
                      <Loader
                        color={"#ffffff"}
                        type={"Oval"}
                        width={"20px"}
                        height={"20px"}
                      />
                    )}
                  </div>
                  <div className="ml-2">{s}</div>
                </div>
              ))}
            </div>
            {!!deploy.workload.jobId ? (
              <React.Fragment>
                <div className="container my-2 py-4 px-5 flex flex-row justify-start items-end">
                  <label className="font-bold text-2xl mr-2">
                    Workload name:
                  </label>
                  {deploy.workload.jobName}
                </div>
                <div className="container my-2 py-4 px-5 flex flex-row justify-start items-end">
                  <label className="font-bold text-2xl mr-2">
                    Workload url:
                  </label>
                  <a
                    className="hover:underline text-blue-500"
                    href={"//" + deploy.workload.url}
                    target="_blank"
                  >
                    {deploy.workload.url}
                  </a>
                </div>
                {logs ? (
                  <div className="container my-2 py-4 px-4 flex flex-row justify-start items-center">
                    <Logs logs={logs} />
                  </div>
                ) : null}
              </React.Fragment>
            ) : null}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Run;
