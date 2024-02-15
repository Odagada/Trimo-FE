import OrderDropdown from "@/components/atoms/Dropdowns/OrderDropdown";
import SearchBar from "@/components/atoms/Inputs/SearchBar";
import FilterDropdown from "@/components/molecules/FilterDropdown";
import Nav from "@/components/molecules/NavigationBar";
import SearchList from "@/components/organisms/SearchList";

export default function Search() {
  return (
    <div>
      <Nav />
      <SearchBar size="small" />
      <div className="mt-15 flex justify-center">
        <div className="w-460 text-right">
          <FilterDropdown />
        </div>
      </div>
      <div className="border-gray-30 mt-42 mx-120 pt-8 pb-12 border-t">
        <OrderDropdown />
        <SearchList />
      </div>
    </div>
  );
}
