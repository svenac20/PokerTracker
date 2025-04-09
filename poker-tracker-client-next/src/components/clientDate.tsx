"use client";

import { format } from "date-fns";
import { FunctionComponent } from "react";

interface ClientDateProps {
  date: Date;
}

const ClientDate: FunctionComponent<ClientDateProps> = ({ date }) => {
  return <p className="font-semibold">Start: {format(date, "dd/MM HH:mm")}</p>;
};

export default ClientDate;
