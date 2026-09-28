import { cn } from "@/lib/cn";

export function ProgressBar({
  value,
  className,
  barClassName,
}: {
  value: number;
  className?: string;
  barClassName?: string;
}) {
  const v = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cn(
        "h-2.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800",
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500",
          barClassName,
        )}
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
