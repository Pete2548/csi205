const Home = () => {
  return (
    <div className="container bg-light p-4 rounded-3 shadow-sm">
      <h2 className="text-center mb-4">Home PAGE</h2>
      <div className="row align-items-center">
        <div className="col-md-4 text-center">
        </div>
        <div className="text-center">
          <h3>ศุภกร อินทรกุล</h3>
          <p className="fs-5 text-muted">รหัสนิสิต: 67116552</p>
          <ul className="list-unstyled">
            <li>
              <strong>วิท-คอม/มหาวิทยาลัยศรีปทุม</strong>
            </li>
            <li>
              <strong>ชั้นปีที่ 2/สาขาวิท-คอม</strong>
            </li>
          </ul>
          <p>
            <strong>แนะนำตัวเอง:</strong>
            สวัสดีครับผมชื่อ ศุภกร อินทรกุล เป็นนิสิตชั้นปีที่ 2 สาขาวิทยาการคอมพิวเตอร์
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;