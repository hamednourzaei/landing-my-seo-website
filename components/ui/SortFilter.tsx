// components/ui/SortFilter.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[130px] font-kalameh items-center text-center">
        <SelectValue placeholder="مرتب‌سازی بر اساس" />
      </SelectTrigger>
      <SelectContent side="left">
        <SelectItem value="newest" className="font-kalameh font-bold">
          جدیدترین
        </SelectItem>
        <SelectItem value="oldest" className="font-kalameh font-bold">
          قدیمی‌ترین
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortFilter;
