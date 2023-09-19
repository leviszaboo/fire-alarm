import { BellRing, Flame, Timer } from "lucide-react"
import FadeIn from "../FadeIn"

interface ReportTileProps {
  floor: number,
  reports: number,
  fires: number,
  duration: string
}

export default function ReportTile({floor, reports, fires, duration}: ReportTileProps) {
  return (
    <FadeIn delay={0.26}>
      <div className="h-60 border-4 border-black rounded-lg">
        <div className="flex flex column items-center justify-center p-4">
          <h1 className="text-3xl font-bold">Floor {floor}</h1>
          <div className="text-xl flex font-semibold ml-auto"><Timer className="pr-1"/> {duration}</div>
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
    </FadeIn>
  )
}
