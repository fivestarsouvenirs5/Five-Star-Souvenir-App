"use client";

import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import AddDeliveryButton from "../addDeliveryButton";

const fetchDates = async () => {
  try {
    const res = await fetch("/api/getDates", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    return await res.json();
  } catch (error) {
    console.error("Error fetching delivery date:", error);
    throw error;
  }
};

export default function DeliveryDate({ userMetadata }) {
  const [dates, setDates] = useState([]);
  const [reload, setReload] = useState(false);

  const user = useUser();

  useEffect(() => {
    const getDates = async () => {
      const fetchedDates = await fetchDates();
      setDates(fetchedDates);
    };

    getDates();
  }, [reload]);

  return (
    <section className="w-full px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
      <div className="flex flex-col sm:flex-row gap-2">
        
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary leading-snug">
          <span>Next Delivery: </span>

          {dates.map((date, i) => (
            <span key={date.delivery_id}>
              {date.month} {date.number}, {date.year}
              {i !== dates.length - 1 && ", "}
            </span>
          ))}
        </div>

        {user.user != undefined &&
          userMetadata.app_metadata.admin == true && (
            <div className="flex">
              <AddDeliveryButton
                deliveryDates={dates}
                reload={reload}
                setReload={setReload}
              />
            </div>
        )}
      </div>
    </section>
  );
}