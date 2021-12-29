type Path = `/${string}`;

interface ActivityLoaderFace {
  path: string;
  activity: JSX.Element;
}

export { ActivityLoaderFace, Path };
