import { RootState } from "@/redux/store";
import React from "react";
import {
  RiAlarmWarningLine,
  RiCheckboxCircleLine,
  RiListCheck,
  RiTimeLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";

const DisplayCountProject = () => {
  const { status } = useSelector((state: RootState) => state.status);

  const totalProjectsCount = status?.projectsTotal || 0;
  const activeProjectsCount = status?.projectsCurrents || 0;
  const overdueProjectCont = status?.projectsOverdue || 0;
  const finishedProjectsCount = status?.projectsFinish || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total de Projetos</p>
            <h3 className="text-2xl font-bold mt-1">{totalProjectsCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <RiListCheck className="h-6 w-6 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Em Andamento</p>
            <h3 className="text-2xl font-bold mt-1">{activeProjectsCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <RiTimeLine className="h-6 w-6 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Concluídos</p>
            <h3 className="text-2xl font-bold mt-1">{finishedProjectsCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
            <RiCheckboxCircleLine className="h-6 w-6 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Atrasados</p>
            <h3 className="text-2xl font-bold mt-1">{overdueProjectCont}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <RiAlarmWarningLine className="h-6 w-6 text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCountProject;
