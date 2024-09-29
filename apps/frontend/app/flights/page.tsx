import { Suspense } from "react";
import FlightsPage from "./flightspage";

const Flight = () => {
    return (
        <Suspense fallback={null}>
            <FlightsPage />
        </Suspense>
    )
}
export default Flight;