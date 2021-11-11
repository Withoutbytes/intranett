import { CheckIcon } from "@heroicons/react/solid";
import { classNames } from "lib/classNames";

interface ICheckBox2 {
    value: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
}

const CheckBox2: React.FC<ICheckBox2> = ({ value, onChange, className }) => {
    return (
        <div
            onClick={() => onChange(!value)}
            className={classNames(
                className,
                " border-2 inline-block rounded-full text-transparent align-middle hover:cursor-pointer",
                value
                    ? "bg-[#48bb78] border-[#48bb78]"
                    : "bg-transparent border-[#718086]"
            )}
        >
            {value ? (
                <CheckIcon className="w-4 h-4 text-white" />
            ) : (
                <CheckIcon className="w-4 h-4 text-[#718086]" />
            )}
        </div>
    );
};
export default CheckBox2;
