import { Datepicker } from "@aliakbarazizi/headless-datepicker";
import DeleteIcon from "./icons/DeleteIcon";
import formatHours from "@/utils/formatHours";

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

  return (
    <Datepicker onChange={(date) => onChange(formatHours(date as Date))} value={valueToDateHours(value)}>
      <div className="relative">
        <Datepicker.Input
          format="HH aa"
          className="flex w-160 h-36 border border-gray30 rounded-10 middle-text text-center font-bold"
        />
        {value && (
          <button type="button" className="absolute inset-y-3 right-3" onClick={() => onChange(undefined)}>
            <DeleteIcon />
          </button>
        )}
      </div>
      <Datepicker.Picker className="flex max-h-135 heading5 bg-white border middle-text" id="HourPicker">
        <Datepicker.Items type="hour" className="overflow-y-auto scroll-smooth p-16 space-y-20" disableAutoScroll>
          {({ items }) =>
            items.map((item) => (
              <Datepicker.Item
                key={item.key}
                item={item}
                type="button"
                action="close"
                className="flex justify-center items-center h-10 hover:text-gray-20"
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
