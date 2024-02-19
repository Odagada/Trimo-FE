import { Datepicker } from "@aliakbarazizi/headless-datepicker";

export default function TimePicker({ onChange }: { onChange: (arg: string) => void }) {
  function formatHours(date: Date) {
    const hours = String(date.getHours()).padStart(2, "0");
    const format = hours + "00";
    return format;
  }
  return (
    <Datepicker onChange={(date) => onChange(formatHours(date as Date))}>
      <Datepicker.Input
        format="HH aa"
        className="flex w-160 h-36 border border-gray30 rounded-10 middle-text text-center font-bold"
      />
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
