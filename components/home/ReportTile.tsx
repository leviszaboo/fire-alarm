import { BellRing, Flame, Siren } from "lucide-react"

interface ReportTileProps {
  floor: number,
  reports: number,
  fires: number
}

export default function ReportTile({floor, reports, fires}: ReportTileProps) {
  return (
    <div className="h-56 border-4 border-black rounded-lg">
      <div className="flex flex column p-4">
        <h1 className="text-3xl font-bold">Floor {floor}</h1>
      </div>
      <div className="flex flex-column py-2 px-4">
        <BellRing size={36} fill="red" className="mr-auto"/>
        <Flame size={36} fill="orange" className="mr-auto"/>
      </div>
      <div className="flex flex-column px-2 px-4">
        <h1 className="ml-auto text-7xl pr-6">{reports}</h1>
        <h1 className="ml-auto text-7xl pr-6">{fires}</h1>
      </div>
    </div>
  )
}
