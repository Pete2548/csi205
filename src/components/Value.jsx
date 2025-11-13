
const Value = ({ name, value, setValue, type }) => {
  return (
    <div
      className="border border-black border-2 mx-auto rounded-3 p-2 bg-secondary-subtle mg-3"
      style={{ width: "fit-content" }}
    >
      <h1 className="text-primary text-center">{name || "VALUE"}</h1>
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-danger"
          onClick={() => setValue((p) => p - 1)}
        >
          &minus;
        </button>
        <div className="fs-3 fw-bold">
          {type === "real" ? value.toFixed(2) : Math.round(value)}
        </div>
        <button
          className="btn btn-success"
          onClick={() => setValue((p) => p + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Value;
