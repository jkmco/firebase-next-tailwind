import {
  updateConfigValueByAppAndKey,
  deleteConfigByAppAndKey,
  createConfigValue,
} from "../helpers/configHelper";

import { RiSaveFill, RiAddBoxFill, RiDeleteBin7Fill } from "react-icons/ri";

import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ConfigsTable({ configs }) {
  const [loading, setLoading] = useState(false);
  const [submitForm, setSubmitForm] = useState("");
  const router = useRouter();

  const updateConfig = async (e) => {
    e.preventDefault();
    setLoading(true);

    const app = e.target.configApp.value;
    const key = e.target.configKey.value;
    const value = e.target.configValue.value;

    if (submitForm == "update") {
      await updateConfigValueByAppAndKey(app, key, value);
    } else if (submitForm == "delete") {
      await deleteConfigByAppAndKey(app, key);
      router.reload(window.location.pathname);
    }

    setLoading(false);

    toast.success("saved!");
  };

  return (
    <div className="">
      {/* first component for creating new config */}
      <CreateConfig />

      <table className="w-auto divide-y divide-gray-200 ">
        <thead className="bg-gray-50">
          <tr>
            <th className="table-head">App</th>
            <th className="table-head">Key</th>
            <th className="table-head">Value</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {configs.map((config) => (
            <tr
              className="justify-center text-sm text-gray-600 text-left"
              key={`${config.app}-${config.key}`}
            >
              <td className="px-4 py-2 w-32">{config.app}</td>
              <td className="px-4 py-2 w-32">@ {config.key}</td>
              <td className="px-4 py-2 w-90">
                <form onSubmit={updateConfig} className="flex text-sm">
                  <input type="hidden" name="configApp" value={config.app} />
                  <input type="hidden" name="configKey" value={config.key} />
                  <input
                    name="configValue"
                    className="w-44 h-6 px-2 mr-2 ring-1 ring-gray-300 rounded-sm text-red-400 disabled:opacity-50"
                    defaultValue={config.value}
                    disabled={loading}
                  />
                  <button
                    disabled={loading}
                    name="saveButton"
                    className="mr-1 disabled:opacity-50"
                    onClick={() => {
                      setSubmitForm("update");
                    }}
                  >
                    <RiSaveFill className="text-green-500 hover:text-green-400 w-5 h-5" />
                  </button>
                  <button
                    disabled={loading}
                    name="deleteButton"
                    className="disabled:opacity-50"
                    onClick={() => {
                      setSubmitForm("delete");
                    }}
                  >
                    <RiDeleteBin7Fill className="text-red-500 hover:text-red-400 w-5 h-5" />
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CreateConfig() {
  const [loading, setLoading] = useState(false);
  const [configApp, setConfigApp] = useState("");
  const [configKey, setConfigKey] = useState("");
  const [configValue, setConfigValue] = useState("");
  const router = useRouter();

  const createConfig = async (e) => {
    e.preventDefault();
    setLoading(true);

    await createConfigValue(configApp, configKey, configValue);
    setLoading(false);

    toast.success("created!");
    router.reload(window.location.pathname);
  };

  return (
    <div className="w-min p-3 mb-3 bg-gray-200 rounded-md">
      <h1
        className="mb-2 text-left text-xs text-gray-500
                   font-medium uppercase tracking-wider"
      >
        create config
      </h1>
      <form
        onSubmit={createConfig}
        className="flex text-sm space-x-2 select-none"
      >
        <input
          name="configApp"
          value={configApp}
          onChange={(e) => {
            setConfigApp(e.target.value);
          }}
          className="w-32 px-2 py-1 rounded-sm border border-transparent
                    focus:outline-none focus:ring-1 focus:ring-gray-300
                    disabled:opacity-50"
          placeholder="app"
          disabled={loading}
        />
        <input
          name="configKey"
          value={configKey}
          onChange={(e) => {
            setConfigKey(e.target.value);
          }}
          className="w-32 px-2 py-1 rounded-sm border border-transparent 
                    focus:outline-none focus:ring-1 focus:ring-gray-300
                    disabled:opacity-50"
          placeholder="key"
          disabled={loading}
        />
        <input
          name="configValue"
          value={configValue}
          onChange={(e) => {
            setConfigValue(e.target.value);
          }}
          className="w-32 px-2 py-1 rounded-sm border border-transparent 
                    focus:outline-none focus:ring-1 focus:ring-gray-300
                    disabled:opacity-50"
          placeholder="value"
          disabled={loading}
        />

        <button disabled={loading} className="disabled:opacity-50">
          <RiAddBoxFill className=" w-6 h-6 text-gray-500 hover:text-yellow-400" />
        </button>
      </form>
    </div>
  );
}
