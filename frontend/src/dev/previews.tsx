import React from "react";
import { TicketList } from "../app/screens/ticket/TicketList";
import { TicketDetails } from "../app/screens/ticket/TicketDetails";
import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/TicketDetails">
        <TicketDetails />
      </ComponentPreview>
      <ComponentPreview path="/TicketList">
        <TicketList />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
