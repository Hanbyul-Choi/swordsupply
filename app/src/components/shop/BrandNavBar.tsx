import React from 'react';

interface Props {
  selectBrandHandler: (brand: string) => void;
  selectedBrand: string;
  brands: string[];
}
function BrandNavBar({selectBrandHandler, brands, selectedBrand}: Props) {
  return (
    <div className="flex gap-4 items-center">
      {brands.map((brand, index) => (
        <button
          key={index}
          onClick={() => selectBrandHandler(brand)}
          className={`px-3 pt-2 border-t-2 hover:text-black ${
            selectedBrand === brand ? 'text-black border-black' : 'text-slate-400 border-transparent'
          }`}>
          {brand.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default BrandNavBar;
