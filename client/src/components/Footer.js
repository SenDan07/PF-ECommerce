const Footer = () => {
  return (
    <div className="footer text-lg">
      <div className="flex flex-col justify-center items-center">
        <h3>
          DESARROLLADO POR{" "}
          <a
            href="/developers-team"
            target="_blank"
            className="font-medium text-[#cccccc] hover:text-white transition-colors duration-200"
          >
            PF_GRUPO-8
          </a>
        </h3>

        <h3 className="font-medium">
          COPYRIGHT © 2022 DON QUIJOTE -
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
