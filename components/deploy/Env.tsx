import React from "react";
import { MdClear } from "react-icons/md";

export interface EnvProps {
  keyValue?: string;
  valueValue?: string;
  readonly?: boolean;
  onDelete: () => void;
  onKeyUpdate: (key: string) => void;
  onValueUpdate: (value: string) => void;
}

const Env: React.FC<EnvProps> = ({
  keyValue = "",
  valueValue = "",
  readonly = false,
  onDelete,
  onKeyUpdate,
  onValueUpdate,
}) => (
  <div className="flex-auto flex flex-row justify-center items-center mb-3">
    <div className="container flex-grow flex justify-center items-center mr-3 h-12">
      <input
        className="new-input"
        value={keyValue}
        readOnly={readonly}
        onChange={(e) => onKeyUpdate(e.target.value)}
      />
    </div>
    <div className="container flex-grow flex justify-center items-center mx-3 h-12">
      <input
        className="new-input"
        value={valueValue}
        readOnly={readonly}
        onChange={(e) => onValueUpdate(e.target.value)}
      />
    </div>
    <div
      className="ml-3 text-white p-2 rounded-lg bg-red-600 hover:bg-red-500 focus:ring-4 focus:ring-red-400 font-bold uppercase cursor-pointer"
      style={{
        flexBasis: "40px",
      }}
      onClick={() => onDelete()}
    >
      <MdClear color="white" />
    </div>
  </div>
);

export default Env;
