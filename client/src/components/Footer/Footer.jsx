const Footer = () => {
  return (
    <div className="footer text-sm sm:text-base">
      <div className="flex flex-col justify-center items-center">
        <h3 className="mb-1">
          DESARROLLADO POR{" "}
          <a
            href="/developers-team"
            target="_blank"
            className="font-bold text-[#3a9cd4] hover:text-white transition-colors duration-200"
          >
            PF_GRUPO-8
          </a>
        </h3>

        <h3 className="font-medium flex flex-col sm:flex-row gap-1 sm:gap-5 justify-center items-center">
          COPYRIGHT © 2022 DON QUIJOTE
          <span className="copy font-normal text-[#cccccc]">
            {" "}
            TODOS LOS DERECHOS RESERVADOS
          </span>
        </h3>
      </div>
    </div>
  );
};

export default Footer;
