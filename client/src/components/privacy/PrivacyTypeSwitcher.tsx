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
        "md:h-20 h-[200px] w-full rounded-3xl md:rounded-full bg-white flex flex-col md:flex-row items-center relative overflow-hidden p-1",
        className
      )}
    >
      <motion.div
        className="absolute rounded-3xl md:rounded-full primary-bg"
        style={{
          width: "100%",
          height: `calc(100% / ${data.length})`,
        }}
        animate={{
          ...(window.innerWidth < 768
            ? {
                top: `${selectedIndex * (100 / data.length)}%`,
                left: 0,
                width: "100%",
                height: `${100 / data.length}%`,
              }
            : {
                left: `${selectedIndex * (100 / data.length)}%`,
                top: 0,
                width: `${100 / data.length}%`,
                height: "100%",
              }),
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
            "cursor-pointer h-[80px] md:h-full w-full rounded-full flex items-center justify-center relative z-10 transition-colors duration-200",
            selectedId === item.id ? "text-white" : "text-text"
          )}
          style={
            window.innerWidth < 768
              ? {
                  height: `calc(100% / ${data.length})`,
                  width: "100%",
                  borderRadius: "1.5rem",
                }
              : undefined
          }
          onClick={() => onSelect?.(item.id)}
        >
          <h4 className="font-normal">{item.label}</h4>
        </button>
      ))}
    </div>
  );
};
