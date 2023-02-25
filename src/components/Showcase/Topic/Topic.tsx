import React from "react";
import { Topic } from "../Showcase";

interface Props {
  topics: Topic[] | undefined;
  onSelect: (topic: Topic) => void;
}

const Topic: React.FC<Props> = ({ topics, onSelect }) => (
  <div className="flex flex-col items-start">
    {topics?.map((topic) => (
      <button
        onClick={() => onSelect(topic)}
        type="button"
        key={`topic-${topic.id}`}
        className="mb-2 w-full rounded-lg py-2 transition-all duration-200 ease-out last:mb-0 hover:bg-gray-300/25"
      >
        {topic.topic}
      </button>
    ))}
  </div>
);

export default React.memo(Topic);
