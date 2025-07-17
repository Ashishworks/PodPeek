import { useEffect } from "react";

const Wakeup=()=>{
    useEffect(() => {
          // Wake up the backend when the page loads
          fetch(`${import.meta.env.VITE_BACKEND_URL}`)
            .then(() => console.log("✅ Backend pinged successfully"))
            .catch((err) => console.error("⚠️ Backend ping failed", err));
            console.log(`server running at ${import.meta.env.VITE_BACKEND_URL}`)
        }, []);
    return(
        console.log("waking up")
    )
}
export default Wakeup;