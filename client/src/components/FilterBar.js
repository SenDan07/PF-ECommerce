import FilterPrice from "./FilterPrice";
import Order from "./Order";

export default function filterBar() {
  return (
    <div className="bg-NavBar text-2xl text-black flex justify-center gap-8 items-center px-7 py-3">
      <div>
        <Order />
        <FilterPrice/>
      </div>
    </div>
  );
}
