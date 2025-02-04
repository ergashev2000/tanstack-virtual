import { useState } from "react";
import { Photo } from "./queryOptions";
import clsx from "clsx";

type Props = {
  data: Photo;
  index: number;
};

export default function Card({ data, index }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="bg-black/20 p-6 rounded-xl text-2xl w-[800px] border border-gray-500"
      onClick={() => setOpen((prev) => !prev)}
    >
      <div className="select-none uppercase text-start"><span>{index + 1}</span> {data.title}</div>
      <div className={clsx("bg-white text-black h-48", !open && "hidden")}>
        {data.thumbnailUrl}
      </div>
    </div>
  );
}
