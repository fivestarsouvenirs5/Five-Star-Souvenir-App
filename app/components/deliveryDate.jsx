"use client"
import { useState, useEffect } from "react";
import {useUser} from "@auth0/nextjs-auth0/client";
import AddDeliveryButton from "./addDeliveryButton";

const fetchDates = async () => {
  try {
    const res = await fetch("/api/getDates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dates = await res.json();
    
    return dates;
  } catch (error) {
    // Handle error
    console.error("Error fetching delivery date:", error);
    throw error; // Re-throw the error if needed
  }
}

export default function DeliveryDate({ userMetadata }) {

  const [dates, setDates] = useState([]);
  const [reload, setReload] = useState(false);

  const user = useUser();

    useEffect(() => {
        const getDates = async () => {
            const fetchedDates = await fetchDates();
            setDates(fetchedDates);
        }
        getDates();
    }, [reload]);

  
 
          return (
          <div className="pt-4 flex items-center gap-2 ">
            <div className="text-2xl font-bold text-secondary">
                <span>Next Delivery: </span>

                {dates.map((date, i) => (
                  <span key={date.delivery_id}>
                    {date.month} {date.number}, {date.year}
                    {i !== dates.length - 1 && ", "}
                  </span>
                ))}
            </div>
            {user && userMetadata.app_metadata.admin == true && (
              <AddDeliveryButton deliveryDates={dates} reload={reload} setReload={setReload} />
            )}
          </div>
          
          )

}