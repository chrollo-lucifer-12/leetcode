import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const languages = ["JS", "CPP"];

const Submit = () => {
    const [value, setValue] = useState("");
    const linesCount = value.split("\n").length;
    const lines = Array.from({ length: linesCount }, (_, i) => i + 1);

    return (
        <div className={"flex justify-between w-[1000px] space-x-4 "}>
            <div className={"flex text-sm w-[80%] bg-[#262626] rounded"}>
                <div className={"w-[30px] overflow-hidden max-h-[500px]"}>
                    {lines.map((line) => (
                        <div key={line} className={"text-[#656665] text-center"}>
                            {line}
                        </div>
                    ))}
                </div>
                <textarea
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    className={"flex-1 focus:outline-none text-white h-[500px] resize-none"}
                >
                </textarea>

            </div>
            <div className={"flex flex-col space-y-4 justify-center items-center"}>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue className={"text-white"} placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            languages.map((language) => (
                                <SelectItem key={language} value={language}>{language}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                <Button className={"bg-white text-black hover:bg-gray-200"}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default Submit;
