import FilterPrice from "../FilterPrice/FilterPrice";
import Order from "../Order/Order";

export default function filterBar() {
  return (
    <div className="bg-NavBar text-black flex justify-end gap-2 items-center px-4 h-max p-3 py-0 pb-1 rounded-bl-lg rounded-br-lg w-full sm:w-max">
      <div className="">
        <Order />
      </div>
      <div className="">
        <FilterPrice />
      </div>
    </div>
  );
}
