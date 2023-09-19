import Link from "next/link";
import { PawPrint } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex flex-col p-6 mt-auto">
      <h3 className="ml-auto mr-auto text-xl font-light">
        Dev by
        &nbsp;
        <Link href={"https://github.com/leviszaboo"}>
          <span className="text-xl font-bold z-50">
            Levi
          </span>
        </Link>
      </h3>
      <PawPrint size={26} className="ml-auto"/>
    </div>
  )
}
