import Link from "next/link";
import { PawPrint } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex flex-column p-6">
      <h3 className="ml-auto mr-auto text-xl font-light">
        Dev by
        &nbsp;
        <Link href={"https://github.com/leviszaboo"}>
          <span className="text-xl font-semibold">
            Levi
          </span>
        </Link>
      </h3>
      <PawPrint size={26}/>
    </div>
  )
}
