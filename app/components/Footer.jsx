import { Config } from '../config';

const GitHubIcon = (props) => (
  <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.19.01-.82.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21-.15.46-.55.38A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
  </svg>
);

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 mt-24 py-10">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <h3 className="text-xl font-bold text-white mb-2">{Config.name}</h3>
        <p className="max-w-2xl mx-auto text-sm text-gray-500 mb-6">
          {Config.pages.Footer.about}
        </p>
        
        <div className="text-sm">
          <span>
            © {new Date().getFullYear()} | Made By <strong className="font-semibold text-white">{Config.author}</strong>
          </span>
          <div className="flex justify-center items-center gap-2 mt-3">
            <span className="text-gray-500">API by</span>
            <a 
              href="https://sankanime.com/"
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 font-semibold text-pink-400 hover:text-pink-300 transition-colors"
            >
              <GitHubIcon className="w-4 h-4" />
              JulianzzGITHUB
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;