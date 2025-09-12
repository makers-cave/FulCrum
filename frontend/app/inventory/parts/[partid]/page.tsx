"use client"
import { useParams } from "next/navigation";

const PartPage = () => {
        const params = useParams();
        const selectedPartId = params.partid as string;
  return (
    <div>PartPage</div>
  )
}

export default PartPage