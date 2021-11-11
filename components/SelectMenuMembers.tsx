import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { classNames } from "lib/classNames";
import CheckBox from "./table/CheckBox";
import { useGetUsersQuery } from "lib/apolloDefinitions";
import client from "lib/apolloClient";

interface IProps {
    selectdsIds: string[];
    onChange: (ids: string[]) => void;
}

const SelectMenuMembers: React.FC<IProps> = ({ selectdsIds, onChange }) => {
    const { data: getUsersData, loading: loadingGetUsers } = useGetUsersQuery({
        client,
    });

    if (loadingGetUsers) {
        return <div>Carregando...</div>;
    }

    const isSelected = (id: string) => selectdsIds.includes(id);

    const handleSelecteds = (value) => {
        if (selectdsIds.some((id) => id === value)) {
            onChange(selectdsIds.filter((id) => id !== value));
        } else {
            onChange([...selectdsIds, value]);
        }
    };

    return (
        <div>
            <Listbox value={selectdsIds} onChange={handleSelecteds}>
                <div className="relative mt-1">
                    <Listbox.Button className="flex justify-around flex-row p-5 w-full py-2 pl-3 pr-10 text-left bg-[#0F1016] rounded-lg shadow-md cursor-default ">
                        {selectdsIds.length > 0 ? (
                            <span className="">
                                {selectdsIds.length} Selecionados
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
                            {getUsersData.getUsers.map((user, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        classNames(
                                            active
                                                ? "text-amber-900 bg-amber-100"
                                                : "text-gray-900",
                                            "cursor-default select-none relative py-2 pr-4 "
                                        )
                                    }
                                    value={user._id}
                                >
                                    {({ selected, active }) => (
                                        <div className="flex gap-2">
                                            <div>
                                                <CheckBox
                                                    value={isSelected(user._id)}
                                                    onChange={(checked) => null}
                                                />
                                            </div>
                                            <span
                                                className={classNames(
                                                    isSelected(user._id)
                                                        ? "font-medium"
                                                        : "font-normal",
                                                    "block truncate text-white"
                                                )}
                                            >
                                                {user.email}
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
