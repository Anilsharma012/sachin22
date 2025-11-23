import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const Logo = ({ size = "md", animated = true }: LogoProps) => {
  const sizes = {
    sm: { container: 32, text: 18 },
    md: { container: 40, text: 22 },
    lg: { container: 48, text: 28 },
  };

  const containerVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  const glowVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: { duration: 3, repeat: Infinity },
    },
  };

  return (
    <motion.div
      variants={animated ? containerVariants : undefined}
      initial={animated ? "initial" : undefined}
      animate={animated ? "animate" : undefined}
      whileHover={animated ? "hover" : undefined}
      className="relative inline-flex items-center justify-center"
    >
      {/* Background Glow */}
      {animated && (
        <motion.div
          variants={glowVariants}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-50 blur-xl"
          style={{
            width: sizes[size].container,
            height: sizes[size].container,
          }}
        />
      )}

      {/* Main Container */}
      <div
        className="relative flex items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg"
        style={{
          width: sizes[size].container,
          height: sizes[size].container,
        }}
      >
        {/* SVG Logo Content */}
        <svg
          viewBox="0 0 40 40"
          width={sizes[size].container - 8}
          height={sizes[size].container - 8}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          {/* Code Bracket Left */}
          <path
            d="M8 12L4 20L8 28"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Code Bracket Right */}
          <path
            d="M32 12L36 20L32 28"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Forward Slash */}
          <path
            d="M14 10L26 30"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Dot */}
          <circle cx="20" cy="20" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* Optional Outer Ring */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-cyan-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{
            width: sizes[size].container,
            height: sizes[size].container,
          }}
        />
      )}
    </motion.div>
  );
};

export default Logo;
