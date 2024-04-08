/**
 * Utility to convert SDMX-CSV formatted data, to CSV formatted data.
 */
export class SdmxToCsvConverter {
    /**
     * Synchronously Converts SDMX-CSV formatted (string) data, to CSV formatted (string) data
     * @param sdmxData the SDMX-CSV formatted (string) data to convert
     * @returns the converted data as a CSV formatted string
     */
    public static convert(sdmxData: string): string {
        // return sdmxData.replace(/\t\\/,'').replace(/\\/,'').replace(/\t/g, ',')
        let toReturn = sdmxData.split(`\t\\`).join(``)
        toReturn = toReturn.split(`\\`).join(``)
        toReturn = toReturn.split(`\t`).join(`,`)
        return toReturn;
    }
    /**
     * Asynchronously Converts SDMX-CSV formatted (string) data, to CSV formatted (string) data
     * @param sdmxData the SDMX-CSV formatted (string) data to convert
     * @returns a promise of the converted data as a CSV formatted string
     */
    public static async convertAsync(sdmxData: string): Promise<string> {
        // return sdmxData.replace(/\t\\/,'').replace(/\\/,'').replace(/\t/g, ',')
        let toReturn = sdmxData.split(`\t\\`).join(``)
        toReturn = toReturn.split(`\\`).join(``)
        toReturn = toReturn.split(`\t`).join(`,`)
        return toReturn;
    }
}
