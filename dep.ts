import { PackageDependList } from "package-depend-list";
import * as path from "path";

const pkg = new PackageDependList({
  package: "./package.json",
  node_modules: path.resolve("./", "node_modules"),
});

// Prints as JSON string
console.log(JSON.stringify(pkg.dependencies(false), null, 4));
