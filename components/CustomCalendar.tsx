import useEventListener from "react-use-event-listener";
import moment from "moment";
import { useState } from "react";
import { Calendar } from "react-date-range";
import { useRef } from "react";

interface IProps {
    date: Date;
    onChange: (value: Date) => void;
}

const CustomCalendar: React.FC<IProps> = ({ date, onChange }) => {
    const [focused, setFocused] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>();

    useEventListener("mousedown", (e) => {
        if (focused) {
            if (!containerRef.current.contains(e.target as any)) {
                setFocused(false);
            }
        }
    });

    return (
        <div className="flex flex-col w-full" ref={containerRef}>
            <input
                value={moment(date).format("DD/MM/YYYY")}
                type="text"
                className="bg-[#0F1016] text-[#718086] px-5 py-2 rounded-lg w-full"
                style={{ border: "transparent" }}
                placeholder="DD/MM/YYYY"
                onFocus={(e) => setFocused(true)}
            />

            {focused && <Calendar date={date} onChange={onChange} />}
        </div>
    );
};

export default CustomCalendar;
