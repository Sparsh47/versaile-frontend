import { Button } from "@/components/ui/button";
import { ShareIcon, ArrowDownTrayIcon } from "@heroicons/react/20/solid";

export default function Options({ save, copy }) {
  return (
    <div className="fixed w-[100px] top-2 right-5 text-left z-[200]">
      <div className="flex items-center">
        <Button variant="ghost">
          <ArrowDownTrayIcon
            className="h-5 w-5 text-gray-700"
            aria-hidden="true"
            onClick={save}
          />
        </Button>
        <Button variant="ghost">
          <ShareIcon
            className="h-5 w-5 text-gray-700"
            aria-hidden="true"
            onClick={() => copy(window.location.href)}
          />
        </Button>
      </div>
    </div>
  );
}
