/**
 * Utility to convert SDMX-CSV formatted data, to CSV formatted data.
 */
export class SdmxToCsvConverter {
    /**
     * Converts SDMX-CSV formatted (string) data, to CSV formatted (string) data
     * @param sdmxData the SDMX-CSV formatted (string) data to convert
     */
    public static async convert(sdmxData: string): Promise<string> {
        // return sdmxData.replace(/\t\\/,'').replace(/\\/,'').replace(/\t/g, ',')
        let toReturn = sdmxData.split(`\t\\`).join(``)
        toReturn = toReturn.split(`\\`).join(``)
        toReturn = toReturn.split(`\t`).join(`,`)
        return toReturn;
    }
}
