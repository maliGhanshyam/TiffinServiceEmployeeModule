import React, { useEffect, useState } from "react";
import {
  getAllTiffinofOrg,
  getAllTiffins,
} from "../../services/AllTiffin/AllTiffin";
import { tiffin } from "../../services/AllTiffin/AllTiffin.types";

const UserDashboard = () => {
  const [tiffins, setTiffins] = useState<tiffin[]>([]);
  const [orgTiffins, setOrgTiffins] = useState<tiffin[]>([]);

  const fetchRetailerTiffins = async () => {
    try {
      const data = await getAllTiffins();
      console.log("data:", data);
      setTiffins(data);
    } catch (error) {
      console.error("Error fetching tiffins:", error);
    }
  };

  const fetchOrgTiffins = async () => {
    try {
      const data = await getAllTiffinofOrg();
      console.log("data:", data);
      setOrgTiffins(data);
    } catch (error) {
      console.error("Error fetching tiffins:", error);
    }
  };

  // useEffect to fetch data
  useEffect(() => {
    fetchRetailerTiffins();
    fetchOrgTiffins();
    console.log(orgTiffins);
  }, []);

  return (
    <div>
      <p>Hello From Dashboard</p>
      {/* Display tiffins list */}
      <div>
        {tiffins.length === 0 ? (
          <p>Loading...</p>
        ) : (
          tiffins.map((orgTiffins) => (
            <div key={orgTiffins.tiffin_name}>
              <p>{orgTiffins.tiffin_name}</p>
              <p>{orgTiffins.tiffin_description}</p>
              <p>{orgTiffins.tiffin_price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
