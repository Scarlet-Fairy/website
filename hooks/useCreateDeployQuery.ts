import React, { useEffect, useState } from "react";

export const useCreateDeployQuery = (query: Record<string, string>) => {
  const [id, setId] = useState("");

  useEffect(() => {
    if (!query.id) return;

    setId(query.id as string);
  }, [query.id]);

  return { id };
};
