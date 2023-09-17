import { Blocks } from "lucide-react"

interface BuildingStatsProps {
  reports: number
}

export default function BuildingStats({ reports }: BuildingStatsProps) {
  return (
    <div className="h-60 border-4 border-black rounded-lg">
    <div className="flex flex column p-4">
      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-700">Building Stats</h1>
      <Blocks size={32} className="ml-auto"/>
    </div>
    <div className="grid grid-cols-2 gap-2 gap-y-5 p-4 pt-2">
      <div className="font-bold">Total Reports: </div>
      <div className="text-6xl font-bold text-center">{reports}</div>
      <div className="font-bold">Total Time:</div>
      <div className="text-5xl font-bold text-center">00:13</div>
    </div>
  </div>
  )
}
