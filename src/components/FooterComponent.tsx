import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub, FaLinkedin } from "react-icons/fa";

const FooterComponent = () => {
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
            <Link href="#" className="hover:text-white transition-colors">
              Sobre
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Recursos
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Serviços
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contato
            </Link>
          </div>

          {/* network */}
          <div className="flex justify-start md:justify-end gap-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
              <FaGithub />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
              <FaLinkedin />
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Yksynk. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">
              Termos e Condições
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
