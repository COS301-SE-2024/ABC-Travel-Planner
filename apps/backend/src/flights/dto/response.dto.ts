export class ResponseDto {
    readonly count: string;
    readonly data: [
        {
            id: number,
            oneWay: boolean,
            lastTicketingDate: string,
            numberOfBookableSeats: number,
            itineraries: [
                duration: string,
                segments: [
                    {
                        departure: {
                        iataCode: string,
                        terminal: number,
                        at: string
                        }, 
                        arrival: {  
                            iataCode: string,
                            terminal: number,
                            at: string
                        },
                        duration: string
                    }
                ]
            ],
            price: {
                currency: string,
                total: string,
                base: string,
                fees: [
                    {
                        amount: string,
                        type: string
                    }
                ],
                grandTotal: string
            },
            travelerPricings: [
                {
                    travelerId: string,
                    fareOption: string,
                    travelerType: string,
                    price: {
                        currency: string,
                        total: string,
                        base: string
                    },
                    fareDetailsBySegment: [
                        {
                            segmentId: string,
                            cabin: string,
                            fareBasis: string,
                            class: string,
                            includedCheckedBags: {
                                quantity: number,
                                weight: number,
                                weightUnit: string
                            },
                            amenities: [
                                {
                                    description: string,
                                    isChargeable: boolean,
                                    amenityType: string,
                                    amenityProvider: {
                                        name: string
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}