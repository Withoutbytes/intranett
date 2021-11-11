import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
    CheckIcon,
    SelectorIcon,
    ChevronDownIcon,
} from "@heroicons/react/solid";
import { classNames } from "lib/classNames";
import CheckBox from "./table/CheckBox";
import P from "pino";

interface IProps {
    //  members: any[];
}
const people = [
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
];

const SelectMenuMembers: React.FC<IProps> = ({}) => {
    const [selecteds, setSelecteds] = useState([people[0]]);

    function isSelected(value) {
        return selecteds.some((selected) => selected.id === value.id);
    }

    const handleSelecteds = (value) => {
        if (selecteds.some((selected) => selected.id === value.id)) {
            setSelecteds(
                selecteds.filter((selected) => selected.id !== value.id)
            );
        } else {
            setSelecteds([...selecteds, value]);
        }
    };

    console.log(selecteds);

    return (
        <div>
            <Listbox value={selecteds} onChange={handleSelecteds}>
                <div className="relative mt-1">
                    <Listbox.Button className="flex justify-around flex-row p-5 w-full py-2 pl-3 pr-10 text-left bg-[#0F1016] rounded-lg shadow-md cursor-default">
                        {selecteds.length > 0 ? (
                            <span className="">
                                {selecteds.length} Selecionados
                            </span>
                        ) : (
                            <span className="">Selecione um ou vários</span>
                        )}
                        <ChevronDownIcon
                            className="w-5 h-5 ml-auto text-gray-400"
                            aria-hidden="true"
                        />
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="justify-start flex flex-col px-5 text-left py-2 mt-1 overflow-auto text-base bg-[#0F1016] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {people.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        classNames(
                                            active
                                                ? "text-amber-900 bg-amber-100"
                                                : "text-gray-900",
                                            "cursor-default select-none relative py-2 pr-4"
                                        )
                                    }
                                    value={person}
                                >
                                    {({ selected, active }) => (
                                        <div className="flex gap-2">
                                            <div>
                                                <CheckBox
                                                    value={isSelected(person)}
                                                    onChange={() => null}
                                                />
                                            </div>
                                            <span
                                                className={classNames(
                                                    isSelected(person)
                                                        ? "font-medium"
                                                        : "font-normal",
                                                    "block truncate"
                                                )}
                                            >
                                                {person.name}
                                            </span>
                                        </div>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
};

export default SelectMenuMembers;
