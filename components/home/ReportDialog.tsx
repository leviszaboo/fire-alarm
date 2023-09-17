"use client";

import { v4 as uuidv4 } from "uuid"
import { useState } from "react";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label"
import { ComboBox, ComboBoxOptions } from "../ComboBox"
import { Siren, SmartphoneNfc } from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useReportStore } from "@/app/hooks/useReport";

const floorOptions: ComboBoxOptions[] = [
  { value: "floor 1", label: "Floor 1" },
  { value: "floor 2", label: 'Floor 2' },
  { value: "floor 3", label: 'Floor 3' },
  { value: "floor 4", label: 'Floor 4' },
  { value: "floor 5", label: 'Floor 5' },
  { value: "floor 6", label: 'Floor 6' },
  { value: "floor 7", label: 'Floor 7' },
  { value: "floor 8", label: 'Floor 8' },
];

const yesNoOptions: ComboBoxOptions[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export default function ReportDialog() {
  const [floor, setFloor] = useState<number | null>(null);
  const [isFire, setIsFire] = useState<boolean | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)

  const { addReport } = useReportStore()
 
  function onSelectFloor(floorString: string) {
    const lastChar = floorString.charAt(floorString.length - 1);
    const floorNumber = parseInt(lastChar, 10); 
    setFloor(floorNumber)
  }

  function onSelectIsFire(fireString: string) {
    if (fireString === "yes") {
      setIsFire(true)
    } 
    if (fireString === "no") {
      setIsFire(false)
    } else {
      setIsFire(null)
    }
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      if (floor && !isNaN(floor) && floor <= 8 && floor >= 1 && (isFire === true || isFire === false)) {

        const documentId = uuidv4();
        const document = {
          id: documentId,
          floor: floor,
          isFire: isFire,
          createdAt: new Date()
        }
  
        await setDoc(doc(db, `reports/${documentId}`), document);
        addReport(floor, isFire)
        setDialogOpen(false);
      } else {
        setError("Some required elements are missing.")
      }
    } catch(err) {
      console.log(err)
    }
    setLoading(false);
    setFloor(null);
    setIsFire(null);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button size={"lg"}>
          <SmartphoneNfc size={22} />
          &nbsp;&nbsp;
          Report Alarm
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex flex-column items-center">
            <Siren />
            <div className="pl-2 pt-1">
              Who set off the fire alarm?
            </div>
          </DialogTitle>
          <DialogDescription className="pt-1 text-left">
            Report fire alarm on your floor.
          </DialogDescription>
        </DialogHeader>
        {error && <div className="text-sm text-red-500">{error}</div>}
        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="name" className={`text-left ${error ? "text-red-500" : null}`}>
              Floor
            </Label>
            <ComboBox optionsList={floorOptions} onSelect={onSelectFloor}/>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="username" className={`text-left ${error ? "text-red-500" : null}`}>
              Was there an actual fire?
            </Label>
            <ComboBox optionsList={yesNoOptions} onSelect={onSelectIsFire}/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={loading}>{!loading ? "Send Report" : "Sending Report..."}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

