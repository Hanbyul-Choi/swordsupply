import React from 'react';

interface Props {
  selectBrandHandler: (brand: string) => void;
  brands: string[];
}
function BrandNavBar({selectBrandHandler, brands}: Props) {
  return (
    <div className="mb-10">
      <div className="flex gap-4">
        {brands.map((brand, index) => (
          <button key={index} onClick={() => selectBrandHandler(brand)}>
            {brand.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BrandNavBar;
