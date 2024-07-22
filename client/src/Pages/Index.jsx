import React, { useEffect, useState } from "react";
import axios from "../Axios/axios";
import PrimaryButton from "../Components/PrimaryButton";
import { toast } from "react-toastify";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const Index = () => {
    const [myIp, setMyIp] = useState("");
    const [searchIp, setSearchIp] = useState("");
    const [geolocation, setGeolocation] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const [histories, setHistories] = useState([]);

    useEffect(() => {
        // Fetch my IP address
        axios
            .get("https://api.ipify.org/")
            .then((response) => {
                if (response) {
                    setMyIp(response.data);
                    searchGeolocation(myIp);
                }
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    // get all history
    useEffect(() => {
        axiosPrivate
            .get("/history")
            .then((response) => {
                if (response.status === 200 || response.statusText === "ok") {
                    setHistories(response.data);
                }
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    const searchGeolocation = (ip) => {
        axios
            .get(`https://ipinfo.io/${ip}?token=b9f1d171b2757c`)
            .then((response) => setGeolocation(() => response.data))
            .catch((error) => console.error("Error:", error));
    };

    const handleSearch = (ev) => {
        ev.preventDefault();

        if (!searchIp) {
            toast.error("Please enter an IP address", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        if (!ValidateIPaddress(searchIp)) {
            toast.error("You have entered an invalid IP address!");
            return;
        }

        searchGeolocation(searchIp);

        createHistory(searchIp);
    };

    const createHistory = (ip) => {
        axiosPrivate
            .post("/history/create", { ip: ip })
            .then((response) => {
                if (response.status === 200 || response.statusText === "ok") {
                    toast.success("Search History Created Successfully!", {
                        position: "top-right",
                        autoClose: 3000,
                    });

                    //
                }
            })
            .catch((error) => console.error("Error:", error));
    };

    const ValidateIPaddress = (ipaddress) => {
        if (
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                ipaddress
            )
        ) {
            return true;
        }
        return false;
    };

    return (
        <div className="mt-5">
            My Ip: <span className="text-xl font-medium">{myIp}</span>
            <div className="mt-6">
                <form>
                    <div className="flex gap-2 items-center">
                        <span>Search Geolocation: </span>
                        <input
                            type="text"
                            name="ip"
                            value={searchIp}
                            onChange={(e) => setSearchIp(e.target.value)}
                            className="border border-gray-200 rounded-md py-2 px-2"
                            placeholder="Enter Ip Address to search"
                            autoFocus
                        />

                        <PrimaryButton
                            type="button"
                            onClick={(e) => handleSearch(e)}
                        >
                            Search
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            <div className="mt-10">
                {geolocation && (
                    <div className="w-full grid grid-cols-[20%_auto] gap-x-4 gap-y-3">
                        <span>City:</span> <span>{geolocation.city}</span>
                        <span>Country:</span> <span>{geolocation.country}</span>
                        <span>Host Name:</span>{" "}
                        <span>{geolocation.hostname}</span>
                        <span>Location:</span> <span>{geolocation.loc}</span>
                        <span>Org:</span> <span>{geolocation.org}</span>
                        <span>Postal:</span> <span>{geolocation.postal}</span>
                        <span>Region:</span> <span> {geolocation.region}</span>
                        <span>Timezone:</span>{" "}
                        <span>{geolocation.timezone}</span>
                    </div>
                )}
            </div>
            <div className="mt-10">
                <h2 className="font-medium">Search History</h2>

                {histories &&
                    histories.length > 0 &&
                    histories.map((item) => (
                        <div key={item.id} className="flex gap-4">
                            <span>{item.ip}</span>{" "}
                            <span>{item.created_at}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Index;
