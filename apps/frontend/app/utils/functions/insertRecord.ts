export const insertRecord = async (uploadDetails: any) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const response = await fetch(`${backendUrl}/itinerary-items/add`, {
    
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(uploadDetails)
    });

    return response.status;
}