"use client";

import { 
  getDocs, 
  query, 
  collection, 
  Timestamp 
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/app/firebase/config";
import ReportTile from "./ReportTile";
import { FloorData, useReportStore } from "@/app/hooks/useReport";
import BuildingStats from "./BuildingStats";
import averageDuration from "@/app/helpers/calculateDuration";
import minutesToHHMM from "@/app/helpers/minutesToHHMM";

interface AverageDurations {
  [floor: number]: string
}

export default function ReportGrid() {
  const [totalReports, setTotalReports] = useState<number>(0)
  const [averageDurations, setAverageDurations] = useState<AverageDurations>({})
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
        const durationsByFloor: { [floor: number]: { [createdAt: number]: number } } = {};
  
          querySnapshot.forEach((doc) => {
            const data = doc.data() as { floor: number, isFire: boolean, createdAt: Timestamp, duration: number}
  
            if (!newFloorData[data.floor]) {
              newFloorData[data.floor] = { reports: 0, fires: 0, duration: 0 };
            }
  
            newFloorData[data.floor].reports++;
            if (data.isFire) {
              newFloorData[data.floor].fires++;
            }

            if (!durationsByFloor[data.floor]) {
              durationsByFloor[data.floor] = {};
            }
    
            durationsByFloor[data.floor][data.createdAt.toMillis()] = data.duration;
          });
  
        setFloorData(newFloorData);
        
        const averageDurationsResult: AverageDurations = {};
        for (const floor of Object.keys(durationsByFloor)) {
          const key = parseInt(floor);
          const duration = averageDuration(durationsByFloor[key])
          averageDurationsResult[key] = minutesToHHMM(duration);
        }
  
        setAverageDurations(averageDurationsResult);

        console.log(durationsByFloor)
        console.log(averageDurations)
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
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-16 p-8 pt-6">
      <BuildingStats reports={totalReports}/>
      {floorDataArray.map((data) => (
        <ReportTile key={data.floor} floor={data.floor} fires={data.fires} reports={data.reports} duration={averageDurations[data.floor]}/>
      ))}
    </div>
  )
}
