import { Github, Twitter } from 'lucide-react';
import { ReactNode } from 'react';

interface LinkProps {
  href: string;
  children: ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <a
      className=" hover:text-gray-300"
      target="_blank"
      rel="noopener"
      href={href}
    >
      {children}
    </a>
  );
};

const Footer = () => {
  return (
    <div className="h-12 flex flex-row justify-around items-center bg-green-900 text-white">
      <span className="text-xs">
        Powered by{' '}
        <Link href="https://platform.openai.com">OpenAI&apos;s GPT</Link>
      </span>

      <div className="inline-flex gap-3">
        <Link href="https://twitter.com/jtaavs">
          <Twitter size={20} />
        </Link>

        <Link href="https://github.com/jtaavola/plant-care-ai">
          <Github size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
