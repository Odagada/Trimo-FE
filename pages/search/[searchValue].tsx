import OrderDropdown from "@/components/atoms/Dropdowns/OrderDropdown";
import SearchBar from "@/components/atoms/Inputs/SearchBar";
import FilterDropdown from "@/components/molecules/FilterDropdown";
import Nav from "@/components/molecules/NavigationBar";
import SearchList from "@/components/organisms/SearchList";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();
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
      <button onClick={() => router.push("/search/소격동")} className="w-300 bg-gray-10 h-48 rounded-full">
        소격동
      </button>
    </div>
  );
}
