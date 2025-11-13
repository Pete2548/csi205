// src/Conversion.js (สร้างไฟล์นี้)

// C = Celsius, F = Fahrenheit, K = Kelvin

// --- แปลงจาก Celsius (State หลัก) ไปหน่วยอื่น ---
export const toFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
};

export const toKelvin = (celsius) => {
    return celsius + 273.15;
};

// --- แปลงกลับไปเป็น Celsius (สำหรับอัปเดต State) ---
export const toCelsiusFromFahrenheit = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
};

export const toCelsiusFromKelvin = (kelvin) => {
    return kelvin - 273.15;
};