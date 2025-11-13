import { useState } from 'react';
const RadixCounter = () => {
  const [value, setValue] = useState(0);

  const minusClick = () => {
    console.log("minus clicked");
    if (value <= 0) {
        setValue((prev) => 4095);
    }else {
        setValue((prev) => prev - 1);
    }
    
  };

  const resetClick = () => {
    console.log("reset clicked");
    setValue(0);
  };

  const plusClick = () => {
    console.log("plus clicked");
    if (value >= 4095) {
        setValue(0)
    }else {
        setValue((prev) => prev + 1);
    }
    
  };

  return (
    <div
      className="border border-2 border-black rounded-3 p-3 m-auto"
      style={{ width: "400px",backgroundColor: "#ffffffff" }}
    >
      <div className="text-center fw-bold fs-4 text-primary">
        {/* title */}
        <h1>RADIX COUNTER</h1>
      </div>
      <div className="d-flex justify-content-between mt-3">
        {/* body */}
        <div className="text-center">
          <div className="fw-bold">[HEX]</div>
          <div className="font-monospace">{value.toString(16).toUpperCase().padStart(3, "0")}</div>
        </div>
        <div className="text-center">
          <div className="fw-bold">[DEX]</div>
          <div className="font-monospace text-primary fw-bold">
            {value.toString().padStart(4, "0")}
          </div>
        </div>
        <div className="text-center">
          <div className="fw-bold">[OCT]</div>
          <div className="font-monospace">{value.toString(8).padStart(4, "0")}</div>
        </div>
        <div className="text-center">
          <div className="fw-bold">[BIN]</div>
          <div className="font-monospace"> {value.toString(2).padStart(12, "0")}</div>
        </div>
      </div>
      <div className="mt-3 d-flex justify-content-around">
        {/* buttons */}
        <button className="btn btn-danger px-4" onClick={minusClick}>
          &minus;
        </button>
        <button className="btn btn-secondary px-4" onClick={resetClick}>
          RESET
        </button>
        <button className="btn btn-success px-4" onClick={plusClick}>
          +
        </button>
      </div>
    </div>
  );
};

export default RadixCounter;
