import { CheckIcon } from "@heroicons/react/solid";
import { classNames } from "lib/classNames";

interface ICheckBox {
    value: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
}

const CheckBox: React.FC<ICheckBox> = ({ value, onChange, className }) => {
    return (
        <div
            onClick={() => onChange(!value)}
            className={classNames(
                className,
                "border-white border-2 inline-block rounded-sm text-transparent hover:cursor-pointer",
                value && "bg-white"
            )}
        >
            {value ? (
                <CheckIcon className="w-3 h-3 text-[#22242E]" />
            ) : (
                <div className="w-3 h-3"></div>
            )}
        </div>
    );
};
export default CheckBox;
