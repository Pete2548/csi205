import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

// ฟังก์ชันสำหรับคำนวณ
const calculate = (operand1, operand2, operator) => {
  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "×":
      return operand1 * operand2;
    case "÷":
      if (operand2 === 0) return "Error"; // ป้องกันการหารด้วยศูนย์
      return operand1 / operand2;
    default:
      return operand2;
  }
};

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [operand1, setOperand1] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand2, setWaitingForOperand2] = useState(false);
  const [memory, setMemory] = useState(0);

  // --- 1. จัดการการกดตัวเลข ---
  const handleNumberClick = (numStr) => {
    if (waitingForOperand2) {
      setDisplayValue(numStr);
      setWaitingForOperand2(false);
    } else {
      setDisplayValue(displayValue === "0" ? numStr : displayValue + numStr);
    }
  };

  // --- 2. จัดการการกดจุดทศนิยม ---
  const handleDecimalClick = () => {
    if (waitingForOperand2) {
      setDisplayValue("0.");
      setWaitingForOperand2(false);
      return;
    }
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  };

  // --- 3. จัดการการกดเครื่องหมาย (+, -, ×, ÷) ---
  const handleOperatorClick = (op) => {
    const currentValue = parseFloat(displayValue);

    if (operand1 === null) {
      // นี่คือการใส่ตัวเลขแรกและเครื่องหมาย
      setOperand1(currentValue);
    } else if (operator) {
      // นี่คือการคำนวณต่อเนื่อง (เช่น 5 + 3 + ...)
      const result = calculate(operand1, currentValue, operator);
      setDisplayValue(String(result));
      setOperand1(result);
    }

    setOperator(op);
    setWaitingForOperand2(true);
  };

  // --- 4. จัดการการกดปุ่ม "เท่ากับ" (=) ---
  const handleEqualsClick = () => {
    if (operator === null || operand1 === null) return;

    const currentValue = parseFloat(displayValue);
    const result = calculate(operand1, currentValue, operator);

    setDisplayValue(String(result));
    setOperand1(null); // รีเซ็ตสำหรับการคำนวณครั้งใหม่
    setOperator(null);
    setWaitingForOperand2(false);
  };

  // --- 5. จัดการการกดปุ่ม "CE" (Clear) ---
  // (ทำให้เป็น All Clear เพื่อความง่าย)
  const handleClearClick = () => {
    setDisplayValue("0");
    setOperand1(null);
    setOperator(null);
    setWaitingForOperand2(false);
  };

  // --- 6. จัดการฟังก์ชันพิเศษ (Unary operations) ---
  const handleUnaryOperatorClick = (opType) => {
    const currentValue = parseFloat(displayValue);
    let result = 0;

    switch (opType) {
      case "+/-":
        result = currentValue * -1;
        break;
      case "√":
        result = Math.sqrt(currentValue);
        break;
      case "%":
        // ถ้ามีการคำนวณอยู่ (เช่น 200 + 10%) ให้คิด 10% ของ operand1
        if (operand1 !== null && operator) {
          result = (operand1 * currentValue) / 100;
        } else {
          // ถ้ากด % ลอยๆ (เช่น 10%) ให้หาร 100
          result = currentValue / 100;
        }
        break;
      case "1/x":
        result = 1 / currentValue;
        break;
      default:
        return;
    }
    setDisplayValue(String(result));
  };

  // --- 7. จัดการฟังก์ชัน Memory ---
  const handleMemoryClick = (memType) => {
    const currentValue = parseFloat(displayValue);
    switch (memType) {
      case "MC": // Memory Clear
        setMemory(0);
        break;
      case "MR": // Memory Recall
        setDisplayValue(String(memory));
        setWaitingForOperand2(false);
        break;
      case "M+": // Memory Add
        setMemory(memory + currentValue);
        break;
      case "M-": // Memory Subtract
        setMemory(memory - currentValue);
        break;
      default:
        return;
    }
  };

  // --- ส่วนของการแสดงผล (JSX) ---
  return (
    <Container
      className="p-3 rounded-3 shadow"
      style={{
        maxWidth: "400px",
        backgroundColor: "#E0E0E0", // สีเทาเหมือนเครื่องคิดเลข
        border: "2px solid #888",
      }}
    >
      <h2 className="text-center mb-3">Calculator</h2>
      {/* จอแสดงผล */}
      <Row>
        <Col>
          <Form.Control
            type="text"
            value={displayValue}
            readOnly
            className="text-end fs-2 mb-3"
            style={{
              backgroundColor: "#D9E9D9", // สีเขียวอ่อน
              fontFamily: "monospace",
            }}
          />
        </Col>
      </Row>

      {/* แถวปุ่ม Memory และ CE */}
      <Row className="g-2 mb-2">
        <Col>
          <Button
            variant="success"
            className="w-100 fw-bold"
            onClick={() => handleMemoryClick("MC")}
          >
            MC
          </Button>
        </Col>
        <Col>
          <Button
            variant="success"
            className="w-100 fw-bold"
            onClick={() => handleMemoryClick("MR")}
          >
            MR
          </Button>
        </Col>
        <Col>
          <Button
            variant="success"
            className="w-100 fw-bold"
            onClick={() => handleMemoryClick("M+")}
          >
            M+
          </Button>
        </Col>
        <Col>
          <Button
            variant="success"
            className="w-100 fw-bold"
            onClick={() => handleMemoryClick("M-")}
          >
            M-
          </Button>
        </Col>
        <Col>
          <Button
            variant="danger"
            className="w-100 fw-bold"
            onClick={handleClearClick}
          >
            CE
          </Button>
        </Col>
      </Row>

      {/* แถว 7, 8, 9, ÷, √ */}
      <Row className="g-2 mb-2">
        <Col>
          <Button
            variant="light"
            className="w-100 fw-bold fs-5"
            onClick={() => handleNumberClick("7")}
          >
            7
          </Button>
        </Col>
        <Col>
          <Button
            variant="light"
            className="w-100 fw-bold fs-5"
            onClick={() => handleNumberClick("8")}
          >
            8
          </Button>
        </Col>
        <Col>
          <Button
            variant="light"
            className="w-100 fw-bold fs-5"
            onClick={() => handleNumberClick("9")}
          >
            9
          </Button>
        </Col>
        <Col>
          <Button
            variant="secondary"
            className="w-100 fw-bold fs-5"
            onClick={() => handleOperatorClick("÷")}
          >
            ÷
          </Button>
        </Col>
        <Col>
          <Button
            variant="secondary"
            className="w-100 fw-bold fs-5"
            onClick={() => handleUnaryOperatorClick("√")}
          >
            √
          </Button>
        </Col>
      </Row>

      {/* แถว 4, 5, 6, ×, % */}
      <Row className="g-2 mb-2">
        <Col>
          <Button
            variant="light"
            className="w-100 fw-bold fs-5"
            onClick={() => handleNumberClick("4")}
          >
            4
          </Button>
        </Col>
        <Col>
          <Button
            variant="light"
            className="w-100 fw-bold fs-5"
            onClick={() => handleNumberClick("5")}
          >
            5
          </Button>
        </Col>
        <Col>
          <Button
            variant="light"
            className="w-100 fw-bold fs-5"
            onClick={() => handleNumberClick("6")}
          >
            6
          </Button>
        </Col>
        <Col>
          <Button
            variant="secondary"
            className="w-100 fw-bold fs-5"
            onClick={() => handleOperatorClick("×")}
          >
            ×
          </Button>
        </Col>
        <Col>
          <Button
            variant="secondary"
            className="w-100 fw-bold fs-5"
            onClick={() => handleUnaryOperatorClick("%")}
          >
            %
          </Button>
        </Col>
      </Row>

      {/* แถว 1, 2, 3, -, 1/x */}
      <Row className="g-2 mb-2">
        <Col>
          <Button
            variant="light"
            className="w-100 fw-bold fs-5"
            onClick={() => handleNumberClick("1")}
          >
            1
          </Button>
        </Col>
        <Col>
          <Button
            variant="light"
            className="w-100 fw-bold fs-5"
            onClick={() => handleNumberClick("2")}
          >
            2
          </Button>
        </Col>
        <Col>
          <Button
            variant="light"
            className="w-100 fw-bold fs-5"
            onClick={() => handleNumberClick("3")}
          >
            3
          </Button>
        </Col>
        <Col>
          <Button
            variant="secondary"
            className="w-100 fw-bold fs-5"
            onClick={() => handleOperatorClick("-")}
          >
            -
          </Button>
        </Col>
        <Col>
          <Button
            variant="secondary"
            className="w-100 fw-bold fs-5"
            onClick={() => handleUnaryOperatorClick("1/x")}
          >
            1/x
          </Button>
        </Col>
      </Row>

      {/* แถว 0, ., +/-, +, = */}
      <Row className="g-2">
        <Col>
          <Button
            variant="light"
            className="w-100 fw-bold fs-5"
            onClick={() => handleNumberClick("0")}
          >
            0
          </Button>
        </Col>
        <Col>
          <Button
            variant="light"
            className="w-100 fw-bold fs-5"
            onClick={handleDecimalClick}
          >
            .
          </Button>
        </Col>
        <Col>
          <Button
            variant="secondary"
            className="w-100 fw-bold fs-5"
            onClick={() => handleUnaryOperatorClick("+/-")}
          >
            +/-
          </Button>
        </Col>
        <Col>
          <Button
            variant="secondary"
            className="w-100 fw-bold fs-5"
            onClick={() => handleOperatorClick("+")}
          >
            +
          </Button>
        </Col>
        <Col>
          <Button
            variant="primary"
            className="w-100 fw-bold fs-5"
            onClick={handleEqualsClick}
          >
            =
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Calculator;