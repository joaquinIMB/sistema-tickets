import { SideBar } from "./SideBar";
import {SubNav} from "./SubNav";

const Aside = () => {
  return (
    <>
      <aside className="flex overflow-hidden w-20 relative">
        <SideBar />
      </aside>
      <SubNav />
    </>
  );
};

export default Aside;
