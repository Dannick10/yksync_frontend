import {
  createTask,
  getTask,
  resetMessageTask,
  updateTaks,
} from "@/redux/slices/TaskSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RiText, RiTextBlock } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  rectIntersection,
} from "@dnd-kit/core";
import DraggableTaskItem from "./DraggableTaskItem";
import { getStatusColor } from "@/utils/getStatusColor";
import { motion } from "framer-motion";
import Droppable from "./Droppable";

type feedbackStatus = {
  title: string;
  path: string;
  quantity?: number;
};

type TaskProps = {
  id: string;
};

const taskSchema = z.object({
  title: z.string().min(5, "Precisa de no mínimo 5 caracteres"),
  description: z.string().min(5, "Precisa de no mínimo 5 caracteres"),
});

type FormData = z.infer<typeof taskSchema>;

const TaskComponent = ({ id }: TaskProps) => {
  const { tasks } = useSelector((state: RootState) => state.task);
  const dispatch = useDispatch<AppDispatch>();

  const [indexStatus, setIndexStatus] = useState<number>(0);
  const [formActive, setFormActive] = useState<"dashboard" | "form">(
    "dashboard"
  );
  const [isDragMove, setIsDragMove] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const typeStatus: string[] = ["todos", "pending", "current", "finish"];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(taskSchema),
  });

  const pendentTask = tasks?.filter((task) => task.status === "pending");
  const currentTask = tasks?.filter((task) => task.status === "current");
  const finishTask = tasks?.filter((task) => task.status === "finish");

  const filteredTasks =
    indexStatus === 0
      ? tasks
      : tasks?.filter((task) => task.status === typeStatus[indexStatus]);

  const filteredDashboardUpdate = typeStatus.filter(
    (type) => type !== typeStatus[indexStatus] && type !== "todos"
  );

  const feedBackStatus: feedbackStatus[] = [
    { title: "todos", path: "todos", quantity: tasks?.length },
    { title: "pendente", path: "pending", quantity: pendentTask?.length },
    { title: "andamento", path: "current", quantity: currentTask?.length },
    { title: "Concluídos", path: "finish", quantity: finishTask?.length },
  ];

  const handleMapConvertStatus = (status: string): string => {
    const mapKeys = {
      todos: "todos",
      pending: "pendente",
      current: "em andamento",
      finish: "concluído",
    };
    return mapKeys[status as keyof typeof mapKeys] ?? "inválido";
  };

  const handleDragStart = () => {
    setIsDragMove(true);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setIsDragMove(false);

    const validStatuses = filteredDashboardUpdate.map((s) => s);
    if (over && validStatuses.includes(over.id as string)) {
      const newStatus = over.id.toString();
      const taskId = active.id.toString();
      dispatch(updateTaks({ id: taskId, status: newStatus }));
    }
  };

  const onSubmit = (data: any) => {
    dispatch(createTask({ task: data, id }));
    setTimeout(() => {
      setFormActive("dashboard");
      dispatch(resetMessageTask());
      reset();
    }, 500);
  };

  useEffect(() => {
    dispatch(getTask({ id }));
  }, [dispatch, id]);

  return (
    <div className="relative">
      {formActive === "form" ? (
        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Título
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-black">
                <RiText className="text-gray-400" />
                <input
                  id="title"
                  type="text"
                  placeholder="título"
                  className="flex-1 bg-transparent border-0 outline-none px-2"
                  {...register("title")}
                />
              </div>
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descrição
              </label>
              <div className="flex items-start border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-black h-[80px] resize-none">
                <RiTextBlock className="text-gray-400" />
                <textarea
                  id="description"
                  placeholder="Descrição"
                  className="flex-1 bg-transparent border-0 outline-none px-2"
                  {...register("description")}
                />
              </div>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2 text-white rounded-md bg-red-600 hover:bg-red-700 transition-colors"
                onClick={() => setFormActive("dashboard")}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 py-2 text-white rounded-md bg-black hover:bg-gray-900 transition-colors"
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-between">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {feedBackStatus.map((feedback, index) => (
                  <button
                    key={index}
                    className={`rounded-md border px-5 py-2 shadow-sm hover:shadow-md transition-shadow relative ${
                      indexStatus === index ? "ring-2 ring-black" : ""
                    }`}
                    onClick={() => setIndexStatus(index)}
                  >
                    <span
                      className={`${
                        feedback.path === "pending"
                          ? "bg-blue-600"
                          : feedback.path === "current"
                            ? "bg-yellow-600"
                            : feedback.path === "todos"
                              ? "bg-zinc-600"
                              : "bg-green-600"
                      } w-2 h-2 rounded-full absolute left-2 top-2`}
                    />
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-xl font-bold">{feedback.quantity}</h3>
                      <p className="text-sm font-medium">{feedback.title}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button
                className="flex items-center justify-center gap-2 px-4 lg:px-2 py-2 text-white rounded-md bg-black hover:bg-gray-900 transition-colors"
                onClick={() => setFormActive("form")}
              >
                Adicionar tarefa
              </button>
            </div>

            <div className="border rounded-md w-full shadow">
              <header className="flex justify-between items-center bg-gray-100 p-2">
                <button
                  onClick={() =>
                    setIndexStatus(
                      (prev) =>
                        (prev - 1 + typeStatus.length) % typeStatus.length
                    )
                  }
                >
                  <FaChevronLeft />
                </button>
                <h3 className="font-medium">
                  {handleMapConvertStatus(typeStatus[indexStatus])}
                </h3>
                <button
                  onClick={() =>
                    setIndexStatus((prev) => (prev + 1) % typeStatus.length)
                  }
                >
                  <FaChevronRight />
                </button>
              </header>
              <DndContext
                sensors={sensors}
                collisionDetection={rectIntersection}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={() => setIsDragMove(false)}
              >
                <section className="h-[300px] overflow-y-auto">
                  {filteredTasks?.map((task) => (
                    <DraggableTaskItem
                      key={task._id}
                      task={task}
                      indexStatus={indexStatus}
                      handleMapConvertStatus={handleMapConvertStatus}
                    />
                  ))}

                  {tasks?.length === 0 && (
                    <div className="flex items-center justify-center h-full">
                      <p>Nenhuma tarefa</p>
                    </div>
                  )}
                </section>

                {isDragMove && (
                  <div className="absolute flex bottom-0 left-0 w-full gap-2 p-2 bg-white/80 backdrop-blur-sm z-50">
                    {filteredDashboardUpdate.map((status, index) => (
                      <Droppable key={index} id={status}>
                        <motion.div
                          className="border rounded-md shadow w-60 group cursor-pointer"
                          initial={{ y: 50 }}
                          animate={{ y: 0 }}
                          transition={{ ease: "circIn", duration: 0.2 }}
                          whileHover={{ scaleY: 1.05 }}
                        >
                          <header className="flex justify-between bg-gray-100 p-2">
                            <h3 className="font-medium">
                              {handleMapConvertStatus(status)}
                            </h3>
                          </header>
                          <section className="h-40 w-full overflow-y-auto bg-gray-50">
                            <div className="border-b p-2 w-full h-20 bg-white opacity-0 group-hover:opacity-100 transition-all duration-75">
                              <span
                                className={`${getStatusColor(status)} w-2 h-2 rounded-full mt-2 absolute`}
                              />
                              <p className="text-sm text-center mt-4">
                                Solte aqui para mover para{" "}
                                {handleMapConvertStatus(status)}
                              </p>
                            </div>
                          </section>
                        </motion.div>
                      </Droppable>
                    ))}
                  </div>
                )}
              </DndContext>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskComponent;
