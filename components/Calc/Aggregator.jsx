import React, { useState } from "react";
import { BsCalculator } from "react-icons/bs";
import { MdRefresh } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const Aggregator = () => {
  const [scores, setScores] = useState({
    jamb: "",
    postUTME: "",
  });
  const [aggregate, setAggregate] = useState(0);

  //   ----------------------------------
  //   set scores
  //  ----------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setScores((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //   ----------------------------------
  //   calculate aggregate function
  //   ----------------------------------
  const calculateAggregate = () => {
    const jamb = Number(scores.jamb);
    const postUTME = Number(scores.postUTME);

    const aggregate = jamb / 8 + postUTME / 2;
    setAggregate(aggregate.toFixed(2));
  };

  //   ----------------------------------
  //   reset form
  //  ----------------------------------
  const reset = () => {
    setScores({
      jamb: "",
      postUTME: "",
    });
    setAggregate(0);
  };

  return (
    <div className="my-3">
      <div className="text-center">
        <BsCalculator className="mb-3" style={{
            color: "var(--primary)",
            fontSize: "3.5rem",
            transform: "rotate(45deg)",
        }} />
      </div>
      <h3 className="text-center">Aggregate Calculator</h3>
      <div
        className="card p-4 px-4 px-md-5 py-5 mx-auto my-3"
        style={{ maxWidth: "700px" }}
      >
        <p className="my-1 text-center">
          Enter your JAMB and Post UTME scores to calculate your <span className="fw-bold">Aggregate Score</span>
        </p>
        <hr />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            calculateAggregate();
          }}
        >
          <div className="form-group mb-3">
            <label htmlFor="jamb" className="mb-2 text-primary">
              JAMB Score
            </label>
            <input
              type="number"
              className="form-control"
              id="jamb"
              name="jamb"
              value={scores.jamb}
              onChange={handleChange}
              placeholder="JAMB Score"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="postUTME" className="mb-2 text-primary">
              Post UTME Score
            </label>
            <input
              type="number"
              className="form-control"
              id="postUTME"
              name="postUTME"
              value={scores.postUTME}
              onChange={handleChange}
              placeholder="Post UTME Score"
              required
            />
          </div>
          <hr />
          <div className="d-flex flex-md-row flex-column flex-md-fill">
            <button
              type="submit"
              className="btn btn-primary rounded me-0 me-md-3"
            >
              Calculate Aggregate
            </button>
            <button
              type="button"
              className="btn btn-secondary mt-3 mt-md-0 rounded"
              onClick={reset}
            >
              <MdRefresh className="me-2 h4 mb-1" />
              Reset form
            </button>
          </div>
          <hr />
          <div className="text-center">
            <h5>Your Aggregate Score is: {aggregate}</h5>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Aggregator;
