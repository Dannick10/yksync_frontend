import { Task } from "@/@types/taskTypes";
import { deleteTask } from "@/redux/slices/TaskSlice";
import { AppDispatch } from "@/redux/store";
import { useDraggable } from "@dnd-kit/core";
import { RiDeleteBinFill } from "react-icons/ri";
import { useDispatch } from "react-redux";

interface DraggableTaskItemProps {
  task: Task;
  indexStatus: number;
  handleMapConvertStatus: (status: string) => string
}

const DraggableTaskItem = ({
  task,
  indexStatus,
  handleMapConvertStatus,
}: DraggableTaskItemProps) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task._id,
        data: {
          type: "task",
          task
        }
      });

      const dispatch = useDispatch<AppDispatch>()

      const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.4 : 1,
        cursor: 'grab',
        touchAction: 'none',
      };

      const handleRemoveTask = (_id: string) => {
        dispatch(deleteTask(_id))
      }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-3 border-l-4 rounded-lg flex justify-between items-start bg-white shadow-sm hover:shadow-md transition-all touch-none ${
        task.status === "pending"
          ? "border-blue-500 bg-blue-50"
          : task.status === "current"
          ? "border-yellow-500 bg-yellow-50"
          : "border-green-500 bg-green-50"
      } ${isDragging ? 'ring-2 ring-black/20' : ''}`}
    >
      <div className="flex-1 relative">
        <h4 className="text-lg font-medium">{task.title}</h4>
        <p className="text-sm text-gray-600">{task.description}</p>
      </div>

      <div className="flex gap-2 items-center">
        {indexStatus === 0 && (
          <span className={`text-xs px-2 py-1 rounded ${
            task.status === "pending"
              ? "bg-blue-100 text-blue-800"
              : task.status === "current"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-800"
          }`}>
            {handleMapConvertStatus(task.status)}
          </span>
        )}

        <button
          className="p-2 text-gray-500 hover:text-red-500 transition-colors"
          aria-label="Delete task"
          onClick={() => handleRemoveTask(task._id)}
        >
          <RiDeleteBinFill />
        </button>
      </div>
    </div>
  );
};

export default DraggableTaskItem;