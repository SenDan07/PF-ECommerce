import React from "react";

export default function RecordOrderDumb({ title, cantidad, subtotal, uprice }) {
  return (
    <div>
      <div className="flex border border-t-0 bg-[#e9e2e2] hover:bg-[#788d99] transition-colors duration-200 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
        <h5 className="border w-2/5 text-center textWrap py-1 sm:py-0">
          {title}
        </h5>
        <h5 className="border w-1/5 text-center textWrap py-1 sm:py-0">
          ${uprice}
        </h5>
        <h5 className="border w-1/5 text-center textWrap py-1 sm:py-0">
          {cantidad}
        </h5>
        <h5 className="border w-1/5 text-center textWrap py-1 sm:py-0 font-bold">
          ${subtotal}
        </h5>
      </div>
    </div>
  );
}
