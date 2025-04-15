import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const FooterComponent = () => {

  const SubItems: { label: string; link: string }[] = [
    {
      label: "Sobre",
      link: "/sobre",
    },
    {
      label: "Recursos",
      link: "/recursos",
    },
    {
      label: "Serviços",
      link: "/services",
    },
    {
      label: "Contato",
      link: "/contato",
    },
  ];


  return (
    <footer className="bg-zinc-950 text-gray-300 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* description */}
          <div>
            <h2 className="text-2xl font-bold text-white">Yksynk</h2>
            <p className="mt-4 text-sm text-gray-400">
              Conectando você ao futuro da tecnologia com inovação e eficiência.
            </p>
          </div>

          {/* Links  */}
          <div className="flex flex-col md:flex-row md:justify-center gap-6">

          {SubItems.map((items,index) => (
            <Link href={items.link} className="hover:text-white transition-colors" key={index}>
              {items.label}
            </Link>
            ))}    
          
          
          </div>


          {/* network */}
          <div className="flex justify-start md:justify-end gap-4">
            <Link href="/https://github.com/Dannick10" target={"_blank"}  className="text-gray-400 hover:text-white transition-colors text-xl">
              <FaGithub />
            </Link>
            <Link href="/https://www.linkedin.com/in/futurodevdaniel/"  target={"_blank"} className="text-gray-400 hover:text-white transition-colors text-xl">
              <FaLinkedin />
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Yksynk. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/termos" className="hover:text-white transition-colors">
              Termos e Condições
            </Link>
            <Link href="/politica" className="hover:text-white transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
