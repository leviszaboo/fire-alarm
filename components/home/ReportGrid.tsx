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
import Legend from "./Legend";
import Loader from "../Loader";


export default function ReportGrid() {
  const [totalReports, setTotalReports] = useState<number>(0)
  const [estimatedAlarms, setEstimatedAlarms] = useState<number>(0)
  const [totalDuration, setTotalDuration] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  const { floorData, setFloorData } = useReportStore()
  const floorDataArray = Object.keys(floorData).map((floor) => ({
    floor: parseInt(floor),
    fires: floorData[parseInt(floor)].fires,
    reports: floorData[parseInt(floor)].reports,
    duration: floorData[parseInt(floor)].duration,
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
  
        let totalDurationCounter = 0
        let totalAlarmCounter = 0

        for (const floor of Object.keys(durationsByFloor)) {
          const key = parseInt(floor);
          const durationData = averageDuration(durationsByFloor[key])
          totalDurationCounter += durationData.sum
          totalAlarmCounter += durationData.alarms
          newFloorData[key].duration += durationData.sum
        }

        setFloorData(newFloorData);
        
        setEstimatedAlarms(totalAlarmCounter)
        setTotalDuration(totalDurationCounter)
        setLoading(false);
      } catch(err) {
        setLoading(false)
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
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <Legend />
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-16 p-8 pt-6">
            <BuildingStats reports={totalReports} duration={minutesToHHMM(totalDuration)} alarms={estimatedAlarms}/>
            {floorDataArray.map((data) => (
              <ReportTile key={data.floor} floor={data.floor} fires={data.fires} reports={data.reports} duration={minutesToHHMM(data.duration)}/>
            ))}
          </div>
        </>
      )}
    </>
  )
}
