import React from "react";


type ProjectProps = {
  title: string;
  description: string;
  answerable: string;
  time: string;
  id: string;
};

const Projects = ({ title, description, time,answerable, id }: ProjectProps) => {
  return (
    <div className="flex flex-col justify-between w-[280.84px] h-[203.62px] bg-white text-black p-2 rounded-md">
      <span className="w-full  h-2 bg-yellow-300"></span>
      <div className="space-y-2 gap-">
        <h2 className="font-medium text-lg">{title}</h2>
        <p className="text-sm font-medium ">{answerable}</p>
        <p className="text-sm">{description}</p>
        <p className="text-xs">{time}</p>
      </div>
      <button className="btn bg-black text-white text-sm hover:scale-100">Seguir para o projeto</button>
    </div>
  );
};

export default Projects;
