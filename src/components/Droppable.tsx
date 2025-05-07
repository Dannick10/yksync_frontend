import { useDroppable } from "@dnd-kit/core";

const Droppable = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  
  return (
    <div 
      ref={setNodeRef}
      className={`h-full ${isOver ? 'bg-gray-100' : ''}`}
    >
      {children}
    </div>
  );
};
export default Droppable