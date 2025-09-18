import { cn } from "@/lib";

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
  return (
    <div
      className={cn(
        "md:h-20 h-[200px] w-full rounded-3xl md:rounded-full bg-white flex flex-col md:flex-row items-center relative overflow-hidden",
        className
      )}
    >
      {data.map((item) => (
        <button
          key={item.id}
          className={cn(
            "cursor-pointer h-[80px] md:h-full w-full rounded-full flex items-center justify-center relative z-10",
            selectedId === item.id
              ? "text-white primary-bg"
              : "text-text bg-transparent"
          )}
          onClick={() => onSelect?.(item.id)}
        >
          <h4 className="font-normal">{item.label}</h4>
        </button>
      ))}
    </div>
  );
};
