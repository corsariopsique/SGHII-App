import { useContext, useEffect } from "react";
import AutenticacionContexto from "./AutenticacionContexto";
import { Navigate } from "react-router";

const Logout = () => {
    
    const auteCtx = useContext(AutenticacionContexto);        

    useEffect(() => {        
        auteCtx.logout();         
    },[]);
    
    return (
        <>
            <Navigate to='/login' replace={true} />
        </>
    )

}
export default Logout;