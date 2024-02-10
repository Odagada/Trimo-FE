export default function TimePicker() {
  return (
    <div className="border border-kakao border-solid">
      <select name="hours" className="heading5 appearance-none outline-none">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>
      <span className="heading5 m-4">:</span>
      <select name="minutes" className="heading5 appearance-none outline-none mr-16">
        <option value="0">00</option>
        <option value="0">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </select>
      <select name="aa" className="heading5 appearance-none outline-none">
        <option value="am">AM</option>
        <option value="pm">PM</option>
      </select>
    </div>
  );
}
