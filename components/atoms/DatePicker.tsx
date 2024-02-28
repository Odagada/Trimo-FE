import { Datepicker } from "@aliakbarazizi/headless-datepicker";
import formatTime from "@/utils/formatTime";
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

  function handleDate(date: Date | null) {
    if (date === undefined || date === null) return onChange(undefined);
    const { formatFull } = formatTime(date);
    onChange(formatFull);
  }
  return (
    <Datepicker onChange={handleDate} value={valueToDate(value)}>
      <div className="relative">
        <Datepicker.Input
          format="yyyy/MM/dd HH:mm"
          className="middle-text flex h-36 w-160 rounded-10 border border-gray-30 pl-12 font-bold"
        />
        {value && (
          <button type="button" className="absolute inset-y-3 right-3" onClick={() => onChange(undefined)}>
            <DeleteIcon />
          </button>
        )}
      </div>

      <Datepicker.Picker defaultType="day" className="heading5 z-20 w-300 rounded-10 border bg-white p-10">
        {({ monthName, hour, minute, year }) => (
          <>
            <div className="flex w-full items-center justify-between space-x-6 py-2 rtl:space-x-reverse">
              <Datepicker.Button action="prev" className="middle-text" type="button">
                &lt;
              </Datepicker.Button>
              <div className="middle-text flex gap-10">
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
                    className="rounded-full hover:bg-gray-20"
                    action={item.type === "day" ? "close" : item.type === "month" ? "showDay" : "showMonth"}
                  >
                    {item.isHeader ? item.text.substring(0, 2) : item.text}
                  </Datepicker.Item>
                ))
              }
            </Datepicker.Items>
            <Datepicker.Picker className="heading5 middle-text flex max-h-80 border bg-white" id="HourPicker">
              <Datepicker.Items type="hour" className="space-y-20 overflow-y-auto scroll-smooth p-16" disableAutoScroll>
                {({ items }) =>
                  items.map((item) => (
                    <Datepicker.Item
                      key={item.key}
                      item={item}
                      action="close"
                      className="flex h-10 items-center justify-center hover:text-gray-20"
                    >
                      {("0" + item.text).slice(-2)}
                    </Datepicker.Item>
                  ))
                }
              </Datepicker.Items>
              <Datepicker.Items
                type="minute"
                className="space-y-20 overflow-y-auto scroll-smooth p-16"
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
                          className="flex h-10 items-center justify-center hover:text-gray-20"
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
