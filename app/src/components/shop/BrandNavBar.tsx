import React from 'react';

interface Props {
  selectBrandHandler: (brand: string) => void;
  selectedBrand: string;
  brands: string[];
}
function BrandNavBar({selectBrandHandler, brands, selectedBrand}: Props) {
  return (
    <div className="mb-4">
      <div className="flex gap-4">
        {brands.map((brand, index) => (
          <button
            key={index}
            onClick={() => selectBrandHandler(brand)}
            className={`px-3 hover:text-black ${selectedBrand === brand ? 'text-black' : 'text-slate-400 '}`}>
            {brand.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BrandNavBar;
