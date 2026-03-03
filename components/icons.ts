// Optimized icon imports for better tree-shaking
// Import only the icons you actually use to reduce bundle size

// Social Media Icons
// LinkedIn isn't available in the Simple Icons (`si`) set in this react-icons version,
// so import a LinkedIn icon from Font Awesome and re-export it as `SiLinkedin` for
// compatibility with the rest of the codebase.
import { FaLinkedin } from 'react-icons/fa';
export { FaLinkedin as SiLinkedin };
export { 
  SiGithub,
  SiOrcid,
  SiGooglescholar,
} from 'react-icons/si';

// Technology Icons
export {
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiSupabase,
  SiFirebase,
  SiHeadlessui,
  SiResend,
} from 'react-icons/si';
