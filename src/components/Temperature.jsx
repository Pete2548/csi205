import { useState } from "react";

// Component ย่อยสำหรับแต่ละหน่วยอุณหภูมิ
const TempControl = ({ title, value, onDecrement, onIncrement }) => {
  return (
    <div
      className="text-center border border-secondary border-2 rounded p-2"
      style={{ backgroundColor: "#D3D3D3", flex: 1 }}
    >
      <h4 className="fw-bold">{title}</h4>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <button className="btn btn-danger px-3" onClick={onDecrement}>
          &minus;
        </button>
        <span className="fw-bold fs-4 mx-2">{value.toFixed(2)}</span>
        <button className="btn btn-success px-3" onClick={onIncrement}>
          +
        </button>
      </div>
    </div>
  );
};

const Temperature = () => {
  // ใช้ Celsius เป็น state หลัก
  const [celsius, setCelsius] = useState(25.0);

  // คำนวณค่า Fahrenheit และ Kelvin จาก Celsius
  const fahrenheit = celsius * (9 / 5) + 32;
  const kelvin = celsius + 273.15;

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงค่า
  const handleCelsiusChange = (increment) => {
    setCelsius((prev) => prev + increment);
  };

  const handleFahrenheitChange = (increment) => {
    const currentFahrenheit = celsius * (9 / 5) + 32;
    const newFahrenheit = currentFahrenheit + increment;
    setCelsius((newFahrenheit - 32) * (5 / 9));
  };

  const handleKelvinChange = (increment) => {
    // การเปลี่ยนแปลง 1 องศา Kelvin เท่ากับการเปลี่ยนแปลง 1 องศา Celsius
    setCelsius((prev) => prev + increment);
  };

  return (
    <div
      className="border border-2 border-secondary mx-auto rounded-3 p-3 my-3"
      style={{ maxWidth: "650px", backgroundColor: "#F5F5F5" }}
    >
      <h2 className="text-center mb-3 fw-bold text-primary" >
        TEMPERATURES
      </h2>

      {/* ส่วนแสดงผลด้านบน */}
      <div className="d-flex justify-content-around mb-3">
        <div className="btn btn-primary fw-bold fs-5 px-3">
          {celsius.toFixed(2)} &deg;C
        </div>
        <div className="btn btn-primary fw-bold fs-5 px-3">
          {fahrenheit.toFixed(2)} &deg;F
        </div>
        <div className="btn btn-primary fw-bold fs-5 px-3">
          {kelvin.toFixed(2)} &deg;K
        </div>
      </div>

      {/* ส่วนควบคุม */}
      <div className="d-flex justify-content-center gap-3">
        <TempControl
          title="CELSIUS"
          value={celsius}
          onDecrement={() => handleCelsiusChange(-1)}
          onIncrement={() => handleCelsiusChange(1)}
        />
        <TempControl
          title="FAHRENHEIT"
          value={fahrenheit}
          onDecrement={() => handleFahrenheitChange(-1)}
          onIncrement={() => handleFahrenheitChange(1)}
        />
        <TempControl
          title="KELVIN"
          value={kelvin}
          onDecrement={() => handleKelvinChange(-1)}
          onIncrement={() => handleKelvinChange(1)}
        />
      </div>
    </div>
  );
};

export default Temperature;