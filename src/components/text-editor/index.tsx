"use client"

import {Dispatch, SetStateAction} from "react";

interface TextEditorProps {
    value ?: string
    setValue ?:  Dispatch<SetStateAction<string>>
    isDisabled : boolean
}

const TextEditor = ({setValue,value,isDisabled} : TextEditorProps) => {

    const linesCount = value!.split("\n").length;
    const lines = Array.from({ length: linesCount }, (_, i) => i + 1);

    return <div className={"flex text-sm w-[80%] bg-[#262626] rounded"}>
        <div className={"w-[30px] overflow-hidden max-h-[500px]"}>
            {lines.map((line) => (
                <div key={line} className={"text-[#656665] text-center"}>
                    {line}
                </div>
            ))}
        </div>
        <textarea
            disabled={isDisabled}
            value={value}
            onChange={(e) => {
                setValue!(e.target.value);
            }}
            className={"flex-1 focus:outline-none text-white h-[500px] resize-none"}
        >
                </textarea>
    </div>
}

export default TextEditor;