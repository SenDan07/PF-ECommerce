import FilterPrice from "./FilterPrice";
import Order from "./Order";

export default function filterBar() {
  return (
    <div className="bg-NavBar text-black px-7 pb-3 text-lg">
      <div className="flex items-center gap-2">
        <Order />
        <FilterPrice />
      </div>
    </div>
  );
}
