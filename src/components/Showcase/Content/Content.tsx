import React from "react";

interface Props {
  selectedTopicId: string | null;
}

const Content: React.FC<Props> = ({ selectedTopicId }) => {
  return <section>{selectedTopicId}</section>;
};

export default React.memo(Content);
