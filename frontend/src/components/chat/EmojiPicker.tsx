import { useEffect, useRef } from "react";
import data from "@emoji-mart/data";
import { init, Picker } from "emoji-mart";
import { useThemeStore } from "@/stores/useThemeStore";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Smile } from "lucide-react";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const { isDark } = useThemeStore();
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    init({ data });

    if (pickerRef.current) {
      pickerRef.current.innerHTML = "";

      const picker = new Picker({
        theme: isDark ? "dark" : "light",
        onEmojiSelect: (emoji: any) => onChange(emoji.native),
        emojiSize: 24,
      });

      pickerRef.current.appendChild(picker);
    }
  }, [isDark, onChange]);

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <Smile className="size-4" />
      </PopoverTrigger>

      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-transparent border-none shadow-none mb-12"
      >
        <div ref={pickerRef} />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
