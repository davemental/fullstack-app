import axios from "../Axios/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });

        setAuth((prev) => {
            return {
                ...prev,
                accessToken: response.data.accessToken,
                user: response.data.user
            }
        });

        return response.data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;