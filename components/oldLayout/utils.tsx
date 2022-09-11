import {FunctionComponent} from "react";

export const ConsoleLog: FunctionComponent = ({children}) => {
  console.log('ConsoleLog', children);
  return <></>
};