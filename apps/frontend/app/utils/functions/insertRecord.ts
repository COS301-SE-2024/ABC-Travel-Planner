export const insertRecord = async (uploadDetails: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/itinerary-items/add`, {
    
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(uploadDetails)
    });

    return response.status;
}