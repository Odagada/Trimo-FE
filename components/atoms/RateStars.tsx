import { Stars } from "@/types/client.types";

const RateStars = ({ number }: { number: Stars }) => {
  const filledStars = Math.floor(number);
  const halfStar = number % 1 === 0.5;
  const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

  return (
    <div className="rate-stars">
      {[...Array(filledStars)].map((_, i) => (
        <span key={i} className="star filled" />
      ))}
      {halfStar && <span className="star half" />}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={i} className="star empty" />
      ))}
    </div>
  );
};

export default RateStars;
