import { useRouter } from "next/navigation";
import React from "react";
import { FaProjectDiagram, FaUser } from "react-icons/fa";
import {
  differenceInDays,
  differenceInHours,
  formatDistance,
  formatRelative,
  subDays,
} from "date-fns";
import { configureTIme, timeResult } from "@/utils/configureTime";

type ProjectProps = {
  title: string;
  description: string;
  answerable: string;
  timeStart: string;
  timeEnd: string;
  color: string;
  id: string;
};

const Projects = ({
  title,
  description,
  timeStart,
  timeEnd,
  answerable,
  color,
  id,
}: ProjectProps) => {
  const router = useRouter();

  const getId = () => {
    router.push("/projects/" + id);
  };

  const pastDateProject = new Date(timeStart);
  const afterDateProject = new Date(timeEnd);

  const time: timeResult = configureTIme(pastDateProject, afterDateProject);

  return (
    <section className="flex flex-col justify-between  h-[203.62px] bg-white text-black p-2 rounded-md">
      <span className={`w-full  h-2`}
      style={{background: color}}></span>
      <article className="space-y-2 gap-">
        <div className="flex gap-2">
          <span>
            <FaProjectDiagram />
          </span>
          <h2 className="font-medium text-lg overflow-hidden text-ellipsis line-clamp-1">
            {title}
          </h2>
        </div>
        <div className="flex gap-2">
          <FaUser />
          <p className="text-sm font-medium overflow-hidden text-ellipsis line-clamp-1">
            {answerable}
          </p>
        </div>

        <p className="text-sm overflow-hidden text-ellipsis line-clamp-1">
          {description}
        </p>
        <p className="text-xs">{time.formatTime}</p>
      </article>
      <button
        className="btn bg-black text-white text-sm hover:scale-100"
        onClick={getId}
      >
        Seguir para o projeto
      </button>
    </section>
  );
};

export default Projects;
