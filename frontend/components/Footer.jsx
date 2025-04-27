const Footer=()=>{
    const date=new Date() 
    const year = date.getFullYear();

    return (
      <>
        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © {year} Copyright:
          <a className="text-reset fw-bold" href="#">
            Pest Sentry
          </a>
        </div>
      </>
    );

}

export default Footer;