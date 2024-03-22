import { useEffect } from "react"
import { Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { removeToken } from "../store/authSlice";


const Logout = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(removeToken());
    }, [dispatch])


    return <Navigate to="/login" />

}

export default Logout