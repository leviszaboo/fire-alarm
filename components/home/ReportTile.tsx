import { BellRing, Flame, Siren, Timer } from "lucide-react"

interface ReportTileProps {
  floor: number,
  reports: number,
  fires: number
}

export default function ReportTile({floor, reports, fires}: ReportTileProps) {
  return (
    <div className="h-60 border-4 border-black rounded-lg">
      <div className="flex flex column items-center justify-center p-4">
        <h1 className="text-3xl font-bold">Floor {floor}</h1>
        <div className="text-3xl font-semibold ml-auto">00:13</div>
      </div>
      <div className="flex flex-column pt-4 px-4">
        <BellRing size={44} fill="red" className="mr-auto"/>
        <Flame size={44} fill="orange" className="mr-auto"/>
      </div>
      <div className="flex flex-column px-2 px-4">
        <h1 className="ml-auto text-8xl pr-7 font-bold">{reports}</h1>
        <h1 className="ml-auto text-8xl pr-7 font-bold">{fires}</h1>
      </div>
    </div>
  )
}
