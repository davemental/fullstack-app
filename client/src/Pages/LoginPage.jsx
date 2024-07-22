import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import  FormInput  from "../Components/Forms/FormInput"
import  PrimaryButton  from "../Components/PrimaryButton";
import useAuth from "../Hooks/useAuth";
import axios from "../Axios/axios"
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [formValues, setFormValues] = useState({
        email: "admin@test.com",
        password: "a",
    });
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { setAuth, persist, setPersist } = useAuth();

    useEffect(() => {
        localStorage.setItem("persist", persist);
    },[persist])

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    const handleLogin = async (ev) => {
        ev.preventDefault();
    
        try {
            const response = await axios.post(
                "/auth/login",
                { email: formValues.email, password: formValues.password },
                {
                    withCredentials: true,
                }
            );

            console.log(response?.data)
    
            const accessToken = response?.data?.accessToken;
            const user = response?.data?.user;
    
            setAuth({user, email: formValues.email, accessToken });
            navigate(from, { replace: true }); // return user from 
    
        } catch (error) { 
            toast.error(
                error && error.response.data ? error.response.data.error : error.message,
                { position: "top-right", autoClose: 3000 }
            );
        }
    }

    const handleOnChange = (ev, setFormValues) => {
        setFormValues((prevValues) => { 
            return {
                ...prevValues,
                [ev.target.name]: ev.target.value,
            }
        });
    }

    return (
        <div className="w-[350px] bg-white rounded-lg border border-orange-800/30 text-center px-10 py-8 font-sm drop-shadow-sm">
            <p className="text-left font-semibold text-3xl text-orange-900/60">
                Log In
            </p>
            <form
                className="mt-4"
                onSubmit={(ev) =>
                  handleLogin(ev)
                }
            >
                <div className="space-y-6">
                    <div className="relative text-left">
                        <FormInput
                            name="email"
                            type="email"
                            placeholder="Enter user email"
                            errorMessage="Invalid email address"
                            required={true}
                            customClass="text-base pl-8"
                            value={formValues.email}
                            onChange={(ev) => handleOnChange(ev, setFormValues)}
                            autoFocus
                        />
                    </div>

                    <div className="relative">
                        <FormInput
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            required={true}
                            customClass="text-base pl-8"
                            value={formValues.password}
                            onChange={(ev) => handleOnChange(ev, setFormValues)}
                        />
                    </div>
                </div>

                <div className="mt-3 text-left flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust this device</label>
                </div>

                <div className="mt-6 flex gap-3 justify-end items-center">
                    <PrimaryButton type="submit">
                        <span>Login</span>
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
