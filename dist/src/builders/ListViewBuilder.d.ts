import * as React from "react";
import { ListInterface } from "@Types/ListBuilder";
declare class ListViewBuilder extends React.Component<{
    isPlugin: boolean;
    pluginName: string;
    data: ListInterface[];
}> {
    /**
     * Check if an key is there
     * @param key
     * @returns {Boolean}
     */
    private getSettingSwitch;
    private getSettingSelect;
    private getPref;
    private setPref;
    private setSetting;
    private default;
    render(): JSX.Element[];
}
export default ListViewBuilder;
