import React, { useEffect, useRef, useState } from "react";
import { Log } from "../../type/deploy";

interface LogsProps {
  logs: Array<Log>;
}

const Logs: React.FC<LogsProps> = ({ logs }) => {
  const containerEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerEl.current) return;

    containerEl.current.scrollTop = containerEl.current.scrollHeight;
  }, [containerEl]);

  return (
    <div
      ref={containerEl}
      className="flex flex-col max-h-56 overflow-y-auto bg-black p-3 rounded-lg w-full"
    >
      {logs
        .sort(
          (log1, log2) =>
            new Date(log1.timestamp).getTime() -
            new Date(log2.timestamp).getTime()
        )
        .map((log, i) => (
          <div key={i}>{log.body}</div>
        ))}
    </div>
  );
};

export default Logs;
