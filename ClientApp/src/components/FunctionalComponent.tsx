import React, { FunctionComponent } from "react";

interface FunctionalComponentProps {
  componentTitle: string;
  startCount: number;
}

export const FunctionalComponent: FunctionComponent<
  FunctionalComponentProps
> = ({ componentTitle, startCount }: FunctionalComponentProps) => {
  return (
    <React.Fragment>
      <h2>{componentTitle}</h2>

      <div>Count: {startCount}</div>
    </React.Fragment>
  );
};
