import React, { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { MdAdd } from "react-icons/md";
import Loader from "react-loader-spinner";

import Layout from "../../components/Layout";
import { listDeploysQuery } from "../../lib/queries";
import { toast } from "react-toastify";
import { Deploy } from "../../type/deploy";
import { LIST_DEPLOYS } from "../../lib/endpoints";
import { useRouter } from "next/router";

interface ListProps {}

const List: React.FC<ListProps> = () => {
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery<
    Array<Deploy>,
    AxiosError
  >(LIST_DEPLOYS, listDeploysQuery);

  return (
    <Layout>
      {isLoading || !data ? (
        <Loader color={"#ffffff"} type={"Oval"} />
      ) : (
        <div className="p-10 w-4/5 flex flex-col items-center justify-center">
          <div className="my-5 text-white flex flex-row justify-left items-center w-full">
            <div className="font-bold text-5xl text-left">Deploys</div>
            <div className="flex-grow block"></div>
            <div
              className="new-submit "
              onClick={() => router.push("/deploy/new")}
            >
              <MdAdd color="white" size={"20px"} />
            </div>
          </div>
          {data.map((deploy, i) => (
            <div
              key={i}
              className="container my-2 py-4 px-5 cursor-pointer hover:bg-gray-600"
              onClick={() => {
                router.push(`/deploy/${deploy.id}`);
              }}
            >
              {deploy.name}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default List;
