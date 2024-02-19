import OrderDropdown from "@/components/atoms/Dropdowns/OrderDropdown";
import Footer from "@/components/atoms/Footer";
import SearchBar from "@/components/atoms/Inputs/SearchBar";
import FilterDropdown from "@/components/molecules/FilterDropdown";
import Nav from "@/components/molecules/NavigationBar";
import SearchList from "@/components/organisms/SearchList";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
  const { query } = router;
  return (
    <div>
      <Nav />
      <SearchBar size="small" />
      <div className="mt-15 flex justify-center">
        <div className="w-460">
          <FilterDropdown />
        </div>
      </div>
      <div className="border-gray-30 mt-42 laptop:mx-120 pt-8 pb-12 border-t mx-20 tablet:mx-60">
        <OrderDropdown />
        <SearchList />
      </div>
      <Footer />
    </div>
  );
}