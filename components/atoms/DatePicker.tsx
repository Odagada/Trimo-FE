import { Datepicker } from "@aliakbarazizi/headless-datepicker";
import formatDateTime from "@/utils/formatDateTime";
import DeleteIcon from "./icons/DeleteIcon";

interface Props {
  onChange: (arg: string | undefined) => void;
  value: string | undefined;
}

export default function DatePicker({ onChange, value }: Props) {
  function valueToDate(value: string | undefined) {
    let date: Date | undefined;
    function deleteZero(value: string) {
      let valueToNumber: number = Number(value);
      if (value[0] === "0") valueToNumber = Number(value.slice(1, 2));
      return valueToNumber;
    }
    if (value) {
      const year = Number(value?.slice(0, 4));
      const month = deleteZero(value?.slice(4, 6)) - 1;
      const days = deleteZero(value?.slice(6, 8));
      const hours = deleteZero(value?.slice(8, 10));
      const minute = deleteZero(value?.slice(10, 12));
      date = new Date(year, month, days, hours, minute);
    } else date = undefined;
    return date;
  }
  valueToDate(value);
  return (
    <Datepicker onChange={(value) => onChange(formatDateTime(value as Date))} value={valueToDate(value)}>
      <div className="relative">
        <Datepicker.Input
          format="yyyy/MM/dd HH:mm"
          className="flex w-160 h-36 border border-gray30 rounded-10 middle-text font-bold pl-12"
        />
        {value && (
          <button type="button" className="absolute inset-y-3 right-3" onClick={() => onChange(undefined)}>
            <DeleteIcon />
          </button>
        )}
      </div>

      <Datepicker.Picker defaultType="day" className="rounded-10 bg-white w-300 heading5 p-10 border z-20">
        {({ monthName, hour, minute, year }) => (
          <>
            <div className="flex w-full items-center justify-between space-x-6 py-2 rtl:space-x-reverse">
              <Datepicker.Button action="prev" className="middle-text" type="button">
                &lt;
              </Datepicker.Button>
              <div className="flex gap-10 middle-text">
                <Datepicker.Button action="toggleHourPicker" type="button">
                  {("0" + hour).slice(-2) + ":" + ("0" + minute).slice(-2)}
                </Datepicker.Button>
                <Datepicker.Button action="toggleMonth" type="button">
                  {monthName}
                </Datepicker.Button>
                <Datepicker.Button action="toggleYear" type="button">
                  {year}
                </Datepicker.Button>
              </div>
              <Datepicker.Button action="next" className="middle-text" type="button">
                &gt;
              </Datepicker.Button>
            </div>
            <Datepicker.Items
              className={({ type }) =>
                `grid w-full auto-rows-max gap-16 overflow-y-auto scroll-smooth middle-text mt-10 ${
                  type === "day" && "grid-cols-7"
                } ${type === "month" && "grid-cols-3"} ${type === "year" && "max-h-[274px] grid-cols-4"}
                  `
              }
            >
              {({ items }) =>
                items.map((item) => (
                  <Datepicker.Item
                    key={item.key}
                    item={item}
                    className="hover:bg-gray-20 rounded-full"
                    action={item.type === "day" ? "close" : item.type === "month" ? "showDay" : "showMonth"}
                  >
                    {item.isHeader ? item.text.substring(0, 2) : item.text}
                  </Datepicker.Item>
                ))
              }
            </Datepicker.Items>
            <Datepicker.Picker className="flex max-h-80 heading5 bg-white border middle-text" id="HourPicker">
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
              <Datepicker.Items
                type="minute"
                className="overflow-y-auto scroll-smooth p-16 space-y-20"
                disableAutoScroll
              >
                {({ items }) =>
                  items.map(
                    (item) =>
                      (item.text === "0" || item.text === "15" || item.text === "30" || item.text === "45") && (
                        <Datepicker.Item
                          key={item.key}
                          item={item}
                          action="close"
                          className="flex justify-center items-center h-10 hover:text-gray-20"
                        >
                          {("0" + item.text).slice(-2)}
                        </Datepicker.Item>
                      )
                  )
                }
              </Datepicker.Items>
            </Datepicker.Picker>
          </>
        )}
      </Datepicker.Picker>
    </Datepicker>
  );
}
