import { BellRing, Flame, Timer } from "lucide-react";
import FadeIn from "../FadeIn";

export default function Legend() {
  return (
    <FadeIn delay={0.1}>
      <div className="flex gap-4 pt-2 pb-3">
        <div className="flex ml-auto">
          <BellRing fill="red"/>
          <h3 className="text-l font-semibold pl-1">- Reports</h3>
        </div>
        <div className="flex">
          <Flame fill="orange"/>
          <h3 className="text-l font-semibold pl-1">- Fires</h3>
        </div>
        <div className="flex mr-auto">
          <Timer/>
          <h3 className="text-l font-semibold pl-1">- Duration</h3>
        </div>
      </div>
    </FadeIn>
  )
}
