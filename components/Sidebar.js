import { VscRocket, VscSettingsGear } from "react-icons/vsc";
import { BiAlarm, BiAtom, BiCalendar } from "react-icons/bi";
import { TiHomeOutline } from "react-icons/ti";

import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 m-0 p-2
                 flex flex-col flex-1
                 bg-gray-900 text-white shaow-lg"
    >
      <SidebarIcon
        icon={<TiHomeOutline size="28" onClick={() => router.push("/")} />}
        text="home 🏠"
      />
      <SidebarIcon
        icon={
          <VscSettingsGear size="28" onClick={() => router.push("/config")} />
        }
        text="config ⚙️"
      />
    </div>
  );
}

function SidebarIcon({ icon, text = "tooltip 💡" }) {
  return (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
}
