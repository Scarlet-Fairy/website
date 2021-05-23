import React, { useEffect, useState } from "react";

export const useCreateDeployQuery = (query: Record<string, string>) => {
  const [name, setName] = useState("");
  const [gitRepo, setGitRepo] = useState("");
  const [envs, setEnvs] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!query.name) return;

    setName(query.name as string);
  }, [query.name]);

  useEffect(() => {
    if (!query.gitRepo) return;

    setGitRepo(query.gitRepo as string);
  }, [query.gitRepo]);

  useEffect(() => {
    if (!query.envs) return;

    setEnvs(JSON.parse(query.envs as string) as Record<string, string>);
  }, [query.envs]);

  return { name, gitRepo, envs };
};
