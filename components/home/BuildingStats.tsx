import { Blocks } from "lucide-react"

interface BuildingStatsProps {
  reports: number
}

export default function BuildingStats({ reports }: BuildingStatsProps) {
  return (
    <div className="h-60 border-2 outline outline-2 outline-blue-400 border-green-600 rounded-lg">
    <div className="flex p-4">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-700 whitespace-nowrap">Building Stats</h1>
      <Blocks size={32} className="ml-auto"/>
    </div>
    <div className="flex justify-center align-center p-4 pt-2">
      <div className="font-bold text-xl">
        Total Reports: 
        </div>
      <div className="text-3xl font-bold ml-auto ">{reports}</div>
    </div>
    <div className="flex p-4 pt-1">
      <div className="font-bold text-xl">Total Duration:</div>
      <div className="text-3xl font-bold ml-auto ">00:13</div>
    </div>
    <div className="flex p-4 pt-1">
      <div className="font-bold text-xl">Estimated Alarms:</div>
      <div className="text-3xl font-bold ml-auto ">6</div>
    </div>
  </div>
  )
}
