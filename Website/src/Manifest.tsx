import MainActivity from "./MainActivity";
import SettingsActivity from "./SettingsActivity";
import LoginActivity from "./LoginActivity";
import LicensesActivity from "./LicensesActivity";

const mainfest = {
  main: <MainActivity />,
  settings: <SettingsActivity />,
  login: <LoginActivity />,
  licenses: <LicensesActivity />,
};
export default mainfest;
