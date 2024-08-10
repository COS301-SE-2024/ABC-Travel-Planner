export const insertRecord = async (uploadDetails: any) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const response = await fetch(`${backendUrl}/itinerary-items/add`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(uploadDetails)
    });

    console.log("Response from server: ", JSON.stringify(response));
    return response.status;
}