"use client";
import { ComponentProps } from "react";
import { formatDistance } from "date-fns";
import { cn } from "@/lib/utils";
import { Info } from "./data";
import { useInfo } from "./use-info";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";

interface InfoListProps {
  items: Info[];
}

export function InfoList({ items }: InfoListProps) {
  const [Info, setInfo] = useInfo();

  return (
    <ScrollArea className="h-[70vh]">
      <div className="flex flex-col gap-2 p-4 pt-0 h-full">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border border-gray-800 p-3 text-left text-sm transition-all"
              // Info.selected === item.id && "bg-muted"
            )}
            onClick={() =>
              setInfo({
                ...Info,
                selected: item.id,
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                  {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs text-muted-foreground"
                    // Info.selected === item.id
                    //   ? "text-select-foreground"
                    //   : "text-muted-foreground"
                  )}
                >
                  {formatDistance(new Date(item.date), new Date())}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div>
            </div>
            <div className="line-clamp-3 text-xs text-muted-foreground">
              {item.text.substring(0, 400)}
            </div>
            {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["置頂"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["日常消息"].includes(label.toLowerCase())) {
    return "secondary";
  }

  return "outline";
}
