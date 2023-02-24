import React from "react";
import type { Topic } from "../Showcase";

interface Props {
  selectedTopic: Topic | null;
}

const Content: React.FC<Props> = ({ selectedTopic }) => {
  return <section>{selectedTopic?.topic}</section>;
};

export default React.memo(Content);
