const AppHeader = () => {
  return (
    <header
      className="p-3 text-white"
      style={{ backgroundColor: "#0D6EFD" }}
    >
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <h5 className="mb-0">รหัสวิชา:CSI-205</h5>
          <h4 className="mb-0 fw-bold">ชื่อวิชา: การพัฒนาโปรแกรมส่วนหน้า</h4>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;