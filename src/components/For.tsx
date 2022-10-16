import React from "react";
import { LoadingScreen } from "./LoadingScreen";

export type ForProps<T, U extends JSX.Element> = {
  each: readonly T[];
  fallback: () => JSX.Element;
  catch: (e: Error | undefined) => JSX.Element;
  children: (item: T, index: number) => U;
};

export function For<T, U extends JSX.Element>(props: ForProps<T, U>) {
  const handler = () => {
    try {
      if (props.each.length !== 0) {
        return props.each.map(props.children);
      } else {
        return props.fallback();
      }
    } catch (e) {
      if (e instanceof Error) {
        return props.catch(e);
      } else {
        return props.catch(undefined);
      }
    }
  };

  return (
    <React.Suspense
      key={Math.floor(Math.random() * 3010)}
      fallback={<LoadingScreen key={Math.floor(Math.random() * 5000)} />}
    >
      {handler()}
    </React.Suspense>
  );
}
