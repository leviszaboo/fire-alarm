"use client";

import { getDocs, query, collection } from "firebase/firestore";

import { db } from "@/app/firebase/config";
import { useEffect, useState } from "react";
import ReportTile from "./ReportTile";
import { FloorData, useReportStore } from "@/app/hooks/useReport";
import BuildingStats from "./BuildingStats";

export default function ReportGrid() {
  const [totalReports, setTotalReports] = useState<number>(0)
  const { floorData, setFloorData } = useReportStore()
  const floorDataArray = Object.keys(floorData).map((floor) => ({
    floor: parseInt(floor),
    fires: floorData[parseInt(floor)].fires,
    reports: floorData[parseInt(floor)].reports,
  }));
  floorDataArray.sort((a, b) => b.reports - a.reports);

  useEffect(() => {
    async function fetchReports(ref: string) { 
      try {
        const querySnapshot = await getDocs(query(collection(db, ref)));
        const newFloorData: { [floor: number]: FloorData } = {};
  
          querySnapshot.forEach((doc) => {
            const data = doc.data() as { floor: number; isFire: boolean };
  
            if (!newFloorData[data.floor]) {
              newFloorData[data.floor] = { reports: 0, fires: 0 };
            }
  
            newFloorData[data.floor].reports++;
            if (data.isFire) {
              newFloorData[data.floor].fires++;
            }
          });
  
          setFloorData(newFloorData);
          console.log(newFloorData)
      } catch(err) {
        console.log(err)
      }
    }

    fetchReports("reports");
  }, [])

  useEffect(() => {
    let count = 0;
    for (const floor in floorData) {
      if (floorData.hasOwnProperty(floor)) {
        count += floorData[floor].reports;
      }
    }
    setTotalReports(count);
  }, [floorData]);

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-16 p-8 pt-6">
      <BuildingStats reports={totalReports}/>
      {floorDataArray.map((data) => (
        <ReportTile key={data.floor} floor={data.floor} fires={data.fires} reports={data.reports} />
      ))}
    </div>
  )
}
