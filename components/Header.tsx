import Link from 'next/link'
import { PawPrint } from 'lucide-react'
import ReportDialog from './home/ReportDialog'

export default function Header() {
  return (
    <div className="flex flex-column items center gap-2 w-full p-6 pl-8 pr-8 mt-1">
      <div className="self-start">
        <Link href="/">
          <PawPrint size={46}/>
        </Link>
      </div>
      <div className="ml-auto">
        <ReportDialog />
      </div>
    </div>
  )
}
