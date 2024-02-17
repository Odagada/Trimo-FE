import { Datepicker } from "@aliakbarazizi/headless-datepicker";

export default function TimePicker() {
  return (
    <Datepicker>
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
