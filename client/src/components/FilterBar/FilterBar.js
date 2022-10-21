import FilterPrice from "../FilterPrice/FilterPrice";
import Order from "../Order";

export default function filterBar() {
  return (
    <div className="bg-NavBar text-xl text-black flex justify-center gap-8 items-center px-7 w-max h-max p-3 py-0 pb-1 rounded-bl-lg">
      <div className="">
        <Order />
      </div>
      <div className="">
        <FilterPrice />
      </div>
    </div>
  );
}
