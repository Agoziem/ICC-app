import React, { useState } from "react";

const QuestionForm = ({ currentSubject }) => {
  const [editMode, setEditMode] = useState(false);
  const [question, setQuestion] = useState({
    id: "",
    questiontext: "",
    questionMark: "",
    answers: [],
    correctAnswer: "",
    correctAnswerdescription: "",
  });

  return (
    <div className="mx-auto mt-3">
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-primary border-0 rounded mb-2 mb-md-0 me-3 me-md-5"
          style={{ backgroundColor: "var(--bgDarkerColor)" }}
          onClick={() => {}}
        >
          <i className="bi bi-plus-circle me-2 h5 mb-0"></i> Add Question
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;
