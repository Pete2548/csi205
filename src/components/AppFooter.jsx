const AppFooter = () => {
  return (
    <footer
      className="p-3 text-white text-center"
      style={{ backgroundColor: "#6f6f6fff" }}
    >
      <div className="container">
        <p className="mb-1">
          มหาวิทยาลัยศรีปทุม | คณะคณะเทคโนโลยีสารสนเทศ | สาขาสาขาวิชาวิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์
        </p>
        <p className="mb-0 ">
         <a href="https://www.facebook.com/supakorn.intarakul/" target="_blank">Facebook: supakorn intarakul</a>|<a href="https://www.instagram.com/si_pete_48/"> Instagram: Pete</a>  
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;