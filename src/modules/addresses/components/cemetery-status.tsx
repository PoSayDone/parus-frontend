import { cn } from "@/lib/utils";

type StatusInfo = { color: string; text: string };

// Статус определяется по ключевым словам в описании
export const getStatusInfo = (note?: string | null): StatusInfo | null => {
  if (!note) return null;
  const lowerNote = note.toLowerCase();

  if (lowerNote.includes("открыто для новых захоронений")) {
    return { color: "bg-status-open", text: "Открыто" };
  }
  if (lowerNote.includes("открыто только для подзахоронений")) {
    return { color: "bg-status-limited", text: "Ограничения" };
  }
  if (lowerNote.includes("закрыто для всех видов захоронений")) {
    return { color: "bg-status-closed", text: "Закрыто" };
  }

  return null;
};

export default function CemeteryStatus({
  note,
  className,
}: {
  note?: string | null;
  className?: string;
}) {
  const status = getStatusInfo(note);
  if (!status) return null;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-xs font-medium",
        className,
      )}
    >
      <span className={cn("size-2 rounded-full", status.color)} aria-hidden />
      {status.text}
    </span>
  );
}
