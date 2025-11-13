import { useState, useEffect, useRef, useCallback } from "react";
import { Container, ButtonGroup, Button } from "react-bootstrap";

// 1. กำหนดค่าคงที่สำหรับรูปภาพ (ลบ / นำหน้า)
const objects = [
  { id: 0, name: "None", src: "" },
  { id: 1, name: "Basketball", src: "img/basketball.png" },
  { id: 2, name: "Football", src: "img/ball.png" },
  { id: 3, name: "Volleyball", src: "img/volleyball.png" },
  { id: 4, name: "Human", src: "img/human.png" },
  { id: 5, name: "Cartoon", src: "img/cartoon.png" },
  { id: 6, name: "Logo", src: "img/logo.png" },
];

const BALL_SIZE = 100; // ขนาดของวัตถุ (100px)
const INITIAL_VELOCITY = { dx: 4, dy: 4 }; // ความเร็ว (45 องศา)

const Animation = () => {
  // --- 2. State และ Refs ---
  const [isRunning, setIsRunning] = useState(false);
  const [activeImageId, setActiveImageId] = useState(1); // เริ่มที่ Basketball

  // ใช้ Refs ในการจัดเก็บค่าที่เปลี่ยนแปลงบ่อยใน loop animation
  // เพื่อป้องกันการ re-render และ stale state
  const boundaryRef = useRef(null); // กล่องขอบเขต
  const ballRef = useRef(null); // ตัววัตถุ (img)
  const animationFrameRef = useRef(null); // ID ของ requestAnimationFrame

  // Refs สำหรับ state ของการเคลื่อนไหว
  const positionRef = useRef({ x: 50, y: 50 });
  const velocityRef = useRef(INITIAL_VELOCITY);
  const rotationRef = useRef(0);

  // --- 3. Game Loop (หัวใจของ Animation) ---
  const gameLoop = useCallback(() => {
    // ดึงค่า DOM elements
    const boundary = boundaryRef.current;
    const ball = ballRef.current;

    if (!boundary || !ball) {
      // ถ้ายัง render ไม่เสร็จ, ข้าม frame นี้
      animationFrameRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    // ขนาดของขอบเขต
    const boundaryWidth = boundary.clientWidth;
    const boundaryHeight = boundary.clientHeight;

    // ดึงค่า state ปัจจุบันจาก Refs
    let { x, y } = positionRef.current;
    let { dx, dy } = velocityRef.current;
    let rot = rotationRef.current;

    // คำนวณค่าใหม่
    x += dx;
    y += dy;
    rot = (rot + 2) % 360; // หมุนทีละ 2 องศา

    // ตรวจสอบการชนขอบ (Bouncing)
    // ชนซ้าย-ขวา
    if (x <= 0 || x + BALL_SIZE >= boundaryWidth) {
      dx = -dx; // กลับทิศทางแกน X
      x = Math.max(0, Math.min(x, boundaryWidth - BALL_SIZE)); // กันจมขอบ
    }
    // ชนบน-ล่าง
    if (y <= 0 || y + BALL_SIZE >= boundaryHeight) {
      dy = -dy; // กลับทิศทางแกน Y
      y = Math.max(0, Math.min(y, boundaryHeight - BALL_SIZE)); // กันจมขอบ
    }

    // อัปเดตค่ากลับไปที่ Refs
    positionRef.current = { x, y };
    velocityRef.current = { dx, dy };
    rotationRef.current = rot;

    // อัปเดต DOM โดยตรง (เพื่อ Performance)
    ball.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;

    // ขอ frame ถัดไป
    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, []); // useCallback เพื่อให้ function นี้คงที่

  // --- 4. Effect สำหรับเริ่ม/หยุด Game Loop ---
  useEffect(() => {
    if (isRunning) {
      // เริ่ม loop
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    } else {
      // หยุด loop
      cancelAnimationFrame(animationFrameRef.current);
    }
    // Cleanup function
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isRunning, gameLoop]); // ทำงานใหม่เมื่อ isRunning เปลี่ยน

  // --- 5. Handlers (Function ที่เรียกใช้) ---

  // ฟังก์ชันสลับการวิ่ง/หยุด
  const handleToggleRun = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []); // ใช้ useCallback เพื่อให้ keyboard listener ไม่ต้องผูกใหม่

  // ฟังก์ชันเปลี่ยนวัตถุ
  const handleChangeObject = useCallback((id) => {
    setActiveImageId(id);
    setIsRunning(false); // หยุด animation เมื่อเปลี่ยน

    // Reset ตำแหน่งกลับไปตรงกลาง
    const boundary = boundaryRef.current;
    if (boundary && ballRef.current) {
      const newX = (boundary.clientWidth - BALL_SIZE) / 2;
      const newY = (boundary.clientHeight - BALL_SIZE) / 2;
      positionRef.current = { x: newX, y: newY };
      velocityRef.current = INITIAL_VELOCITY;
      rotationRef.current = 0;

      // อัปเดต DOM ทันที
      ballRef.current.style.transform = `translate(${newX}px, ${newY}px) rotate(0deg)`;
    }
  }, []); // ใช้ useCallback

  // --- 6. Effect สำหรับ Keyboard Controls ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      // กด Space bar
      if (e.code === "Space") {
        e.preventDefault(); // ป้องกันการ scroll
        handleToggleRun();
      }
      // กด 0-6
      const keyNum = parseInt(e.key);
      if (keyNum >= 0 && keyNum <= 6) {
        handleChangeObject(keyNum);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleToggleRun, handleChangeObject]); // ผูก event ใหม่ถ้า handler เปลี่ยน

  // --- 7. JSX (ส่วนแสดงผล) ---
  const activeObject = objects.find((o) => o.id === activeImageId);

  return (
    <Container className="p-3 my-3 border rounded-3 shadow-sm bg-light">
      <h2 className="text-center">Animation (Week 4)</h2>

      {/* Control Panel */}
      <div className="d-flex justify-content-center flex-wrap gap-1 mb-3">
        <ButtonGroup>
          <Button
            variant={isRunning ? "danger" : "success"}
            onClick={handleToggleRun}
          >
            {isRunning ? (
              <i className="bi bi-pause-fill"></i>
            ) : (
              <i className="bi bi-play-fill"></i>
            )}
            {isRunning ? " PAUSE" : " RUN"}
            &nbsp;(Space)
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          {objects.map((obj) => (
            <Button
              key={obj.id}
              variant="primary"
              active={obj.id === activeImageId}
              onClick={() => handleChangeObject(obj.id)}
            >
              ({obj.id}) {obj.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* Animation Area */}
      <div
        ref={boundaryRef}
        className="rounded"
        style={{
          position: "relative",
          height: "60vh", // 60% ของความสูงหน้าจอ
          minHeight: "400px",
          backgroundColor: "#f0f0f0",
          backgroundImage: `url(img/wood.jpg)`, // แก้ไข: ลบ / นำหน้า
          backgroundSize: "cover",
          border: "2px solid #333",
          overflow: "hidden", // สำคัญมาก
        }}
      >
        {/* The Ball/Object */}
        <img
          ref={ballRef}
          src={activeObject?.src}
          alt={activeObject?.name}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${BALL_SIZE}px`,
            height: `${BALL_SIZE}px`,
            // ทำให้รูปเป็นวงกลมถ้าเป็น Human
            borderRadius: activeImageId === 4 ? "50%" : "0", // *** เพิ่มโค้ดนี้ ***
            // ซ่อนถ้าเป็น 'None'
            visibility: activeImageId === 0 ? "hidden" : "visible",
            // กำหนดค่าเริ่มต้น
            transform: `translate(${positionRef.current.x}px, ${positionRef.current.y}px) rotate(${rotationRef.current}deg)`,
          }}
        />
      </div>
    </Container>
  );
};

export default Animation;