import React from "react";

// Type
import type { Topic } from "../Showcase";

interface Props {
  selectedTopic: Topic | null;
}

const Content: React.FC<Props> = ({ selectedTopic }) => {
  return (
    <section className="w-full">
      
      <div className="w-full rounded-lg p-2 transition-all duration-200 ease-out hover:bg-gray-300/25">
        {selectedTopic?.topic}
      </div>
    </section>
  );
};

export default React.memo(Content);
