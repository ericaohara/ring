import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";

const Spinner = () => (
  <Dimmer active>
    <Loader size="huge" content={"準備中です"} />
  </Dimmer>
);

export default Spinner;
