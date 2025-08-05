import clsx from "clsx";
import { ComponentProps } from "react";

export function Button(props: ComponentProps<"button">) {
    return (
        <button
            {...props}
            className={clsx(
                "px-4 py-2 bg-blue-500 text-white rounded",
                props.className
            )}
        >
            {props.children}
        </button>
    );
}
