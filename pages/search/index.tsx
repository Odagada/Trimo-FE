import OrderDropdown from "@/components/atoms/Dropdowns/OrderDropdown";
import Footer from "@/components/atoms/Footer";
import SearchBar from "@/components/atoms/Inputs/SearchBar";
import FilterDropdown from "@/components/molecules/FilterDropdown";
import Nav from "@/components/molecules/NavigationBar";
import SearchContent from "@/components/organisms/SearchContent";

export default function Search() {
  return (
    <div>
      <Nav />
      <div className="pt-23 pb-15">
        <SearchBar size="small" />
      </div>
      <div className="mt-15 flex justify-center">
        <div className="w-460 flex justify-end">
          <FilterDropdown />
        </div>
      </div>
      <SearchContent />
      <Footer />
    </div>
  );
}
