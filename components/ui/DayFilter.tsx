// components/ui/DayFilter.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DayFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const DayFilter: React.FC<DayFilterProps> = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] font-kalameh">
        <SelectValue placeholder="انتخاب روز" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="yesterday">دیروز</SelectItem>
        <SelectItem value="today">امروز</SelectItem>
        <SelectItem value="tomorrow">فردا</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DayFilter;
