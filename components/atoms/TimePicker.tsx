import { Datepicker } from "@aliakbarazizi/headless-datepicker";
import DeleteIcon from "./icons/DeleteIcon";
import formatTime from "@/utils/formatTime";

interface Props {
  onChange: (arg: string | undefined) => void;
  value: string | undefined;
}

export default function TimePicker({ onChange, value }: Props) {
  function valueToDateHours(value: string | undefined) {
    let date: Date | undefined = new Date();
    if (value) date.setHours(Number(value?.slice(0, 2)));
    else date = undefined;
    return date;
  }

  function handleTime(date: Date | null) {
    if (date === undefined || date === null) return onChange(undefined);
    const { formatHours } = formatTime(date);
    onChange(formatHours);
  }

  return (
    <Datepicker onChange={handleTime} value={valueToDateHours(value)}>
      <div className="relative">
        <Datepicker.Input
          format="HH aa"
          className="border-gray30 middle-text flex h-36 w-160 rounded-10 border text-center font-bold"
        />
        {value && (
          <button type="button" className="absolute inset-y-3 right-3" onClick={() => onChange(undefined)}>
            <DeleteIcon />
          </button>
        )}
      </div>
      <Datepicker.Picker className="heading5 middle-text flex max-h-135 border bg-white" id="HourPicker">
        <Datepicker.Items type="hour" className="space-y-20 overflow-y-auto scroll-smooth p-16" disableAutoScroll>
          {({ items }) =>
            items.map((item) => (
              <Datepicker.Item
                key={item.key}
                item={item}
                type="button"
                action="close"
                className="flex h-10 items-center justify-center hover:text-gray-20"
              >
                {("0" + item.text).slice(-2)}
              </Datepicker.Item>
            ))
          }
        </Datepicker.Items>
      </Datepicker.Picker>
    </Datepicker>
  );
}
