import ConfigsTable from "../../components/ConfigsTable";

import { getAllConfigs } from "../../helpers/configHelper";

import { useState } from "react";

export async function getServerSideProps() {
  const configs = await getAllConfigs();

  return {
    props: { configs },
  };
}

export default function Config(props) {
  const [configs, setConfigs] = useState(props.configs);

  return (
    <main>
      <ConfigsTable configs={configs} />
    </main>
  );
}
