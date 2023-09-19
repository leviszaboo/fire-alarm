import { create } from 'zustand';

export interface FloorData {
  reports: number;
  fires: number;
  duration: number
}

interface ReportStore {
  floorData: { [floor: number]: FloorData };
  setFloorData: (data: { [floor: number]: FloorData }) => void;
  addReport: (floor: number, isFire: boolean, duration: number) => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  floorData: {},
  setFloorData: (data) => set({ floorData: data }),
  addReport: (floor, isFire, duration) => {
    set((state) => {
      const updatedData = { ...state.floorData };

      if (!updatedData[floor]) {
        updatedData[floor] = { reports: 0, fires: 0, duration: 0 };
      }

      updatedData[floor].reports++;

      if (isFire) {
        updatedData[floor].fires++;
      }

      updatedData[floor].duration += duration

      return { floorData: updatedData };
    });
  },

}));


