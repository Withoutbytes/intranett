import { Popover } from "@headlessui/react";
import { useRouter } from "next/router";
import client from "lib/apolloClient";

interface IProps {}

const PopoverLogout: React.FC<IProps> = ({ children }) => {
    const router = useRouter();

    const Logout = () => {
        localStorage.removeItem("token");
        client.cache.reset();
        router.push("/");
    };

    return (
        <Popover className="relative">
            <Popover.Button>{children}</Popover.Button>

            <Popover.Panel className="absolute z-10 bg-[#171923]">
                <div>
                    <button
                        onClick={Logout}
                        className="px-4 py-2 font-bold text-white bg-red-500 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </Popover.Panel>
        </Popover>
    );
};

export default PopoverLogout;
