function Spinner() {
  return (
    <div
      className="border-current border-r-transparent inline-block size-8 animate-spin rounded-full border-4 border-solid align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
  );
}

export default Spinner;
