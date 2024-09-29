export class FlightsDto {
    readonly originLocationCode: string;
    readonly destinationLocationCode: string;
    readonly departureDate: string;
    readonly returnDate?: string;
    readonly adults: string;
    readonly children?: string;
    readonly infants?: string;
    readonly travelClass?: string;
    readonly includedAirlineCodes?: string;
    readonly excludedAirlineCodes?: string;
    readonly nonStop: string;
    readonly currencyCode?: string;
    readonly maxPrice?: string;
    readonly max: string;
}