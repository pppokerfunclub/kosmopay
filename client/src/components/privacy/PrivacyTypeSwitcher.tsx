import { cn } from "@/lib";
import { motion } from "framer-motion";

interface Props {
  className?: string;
  onSelect?: (id: string) => void;
  selectedId?: string;
  data: {
    label: string;
    id: string;
  }[];
}

export const PrivacyTypeSwitcher = ({
  className,
  onSelect,
  selectedId,
  data,
}: Props) => {
  const selectedIndex = data.findIndex((item) => item.id === selectedId);

  return (
    <div
      className={cn(
        "h-20 w-full rounded-full bg-white flex items-center relative overflow-hidden p-1",
        className
      )}
    >
      {/* Анимированный фон */}
      <motion.div
        className="absolute rounded-full primary-bg"
        style={{
          width: `${100 / data.length}%`,
          height: "100%",
        }}
        animate={{
          left: `${selectedIndex * (100 / data.length)}%`,
        }}
        transition={{
          type: "tween",
          duration: 0.3,
          ease: "easeInOut",
        }}
      />

      {data.map((item) => (
        <button
          key={item.id}
          className={cn(
            "cursor-pointer h-full w-full rounded-full flex items-center justify-center relative z-10 transition-colors duration-200",
            selectedId === item.id ? "text-white" : "text-text"
          )}
          onClick={() => onSelect?.(item.id)}
        >
          <h4 className="font-normal">{item.label}</h4>
        </button>
      ))}
    </div>
  );
};
