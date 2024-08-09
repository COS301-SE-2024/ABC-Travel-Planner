import {getFirestore,doc, getDoc} from "firebase/firestore";
import app from "@/libs/firebase/firebase";

export default async function getUser(user_id: any){
    const db = getFirestore(app);
    const docRef = doc(db, "Users", user_id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        return JSON.stringify((docSnap).data());
    }

    
    return null;

}