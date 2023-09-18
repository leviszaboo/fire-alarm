import { Timestamp } from 'firebase/firestore';
import { create } from 'zustand';

export interface FloorData {
  reports: number;
  fires: number;
  duration: number
}

interface ReportStore {
  floorData: { [floor: number]: FloorData };
  setFloorData: (data: { [floor: number]: FloorData }) => void;
  addReport: (floor: number, isFire: boolean) => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  floorData: {},
  setFloorData: (data) => set({ floorData: data }),
  addReport: (floor, isFire) => {
    set((state) => {
      const updatedData = { ...state.floorData };

      if (!updatedData[floor]) {
        updatedData[floor] = { reports: 0, fires: 0, duration: 0 };
      }

      updatedData[floor].reports++;

      if (isFire) {
        updatedData[floor].fires++;
      }

      return { floorData: updatedData };
    });
  },

}));


