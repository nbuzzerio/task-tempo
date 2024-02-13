import { useState } from "react";
import GenerateTask from "./components/GenerateTask";
import TrialTask from "./components/TrialTask";

export interface Task {
  task: string;
  time?: string;
  totalTime?: string;
  completed: string;
}

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [trialTask, setTrialTask] = useState(false);

  console.log(tasks);

  return (
    <div className="h-screen bg-[#222]">
      <h1 className="text-7xl uppercase text-center py-10 text-gray-400">
        Task Tempo
      </h1>
      {isEditing && (
        <GenerateTask
          tasks={tasks}
          setTasks={setTasks}
          setIsEditing={setIsEditing}
        />
      )}
      {!isEditing && !trialTask && (
        <div className="px-3">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-100 bg-red-600 hover:bg-red-700 focus:outline-none focus:border-red-700 focus:ring-red-500"
            onClick={() => setIsEditing(true)}
          >
            Begin Editing Task
          </button>
        </div>
      )}
      {!trialTask && !isEditing && tasks.length && (
        <div className="p-3">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-100 bg-green-600 hover:bg-green-700 focus:outline-none focus:border-green-700 focus:ring-green-500"
            onClick={() => setTrialTask(true)}
          >
            Begin Task Trial
          </button>
        </div>
      )}
      {trialTask && <TrialTask tasks={tasks} setTrialTask={setTrialTask} />}
    </div>
  );
}

export default App;
