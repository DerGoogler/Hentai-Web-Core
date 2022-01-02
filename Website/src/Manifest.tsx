import MainActivity from "./MainActivity";
import SettingsActivity from "./SettingsActivity";
import LoginActivity from "./LoginActivity";
import LicensesActivity from "./LicensesActivity";
import IssuesActivity from "./IssuesActivity";

const mainfest = {
  main: <MainActivity />,
  settings: <SettingsActivity />,
  login: <LoginActivity />,
  licenses: <LicensesActivity />,
  issues: <IssuesActivity />,
};
export default mainfest;
