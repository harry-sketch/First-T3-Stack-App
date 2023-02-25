import { useState } from "react";

interface Props {
  isLoading: boolean;
  onClick: (topic: string) => void;
}

const CreateTopic = ({ onClick, isLoading }: Props) => {
  const [topic, setTopic] = useState<string>("");

  return (
    <div className="mt-3 flex items-center gap-4">
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        type="text"
        className="rounded-lg p-2 text-base font-medium text-slate-700 outline-none focus:outline-none"
        placeholder="add notes..."
      />
      <button
        type="button"
        className="rounded-lg bg-primary px-4 py-2"
        onClick={() => {
          onClick(topic);
          setTopic("");
        }}
      >
        {isLoading ? "loading" : "add"}
      </button>
    </div>
  );
};

export default CreateTopic;
