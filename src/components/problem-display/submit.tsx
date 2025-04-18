import {useState} from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import {addSubmission} from "@/actions/submissions";
import {useMutationData} from "@/hooks/useMutationData";
import TextEditor from "@/components/text-editor";

const languages = [
    {name : "C++ (GCC 9.2.0)",
    code : 54},
    {name : "Python (3.8.1)",
    code : 71},
    {name : "JavaScript (Node.js)",
    code : 63}, {name : "Java (OpenJDK 13)", code : 62}, {name :  "C (GCC 9.2.0)", code : 50}];

const Submit = ({problemId, setTab}: {problemId : string, setTab :  React.Dispatch<React.SetStateAction<"RESULTS" | "TASK" | "SUBMIT">>
}) => {
    const [value, setValue] = useState("");
    const linesCount = value.split("\n").length;
    const lines = Array.from({ length: linesCount }, (_, i) => i + 1);
    const [languageCode, setLanguageCode] = useState(0);
    const [languageName, setLanguageName] = useState("")

    const {mutateAsync, isPending} = useMutationData(["submit-solution"], (data) => addSubmission(data.value,data.problemId, data.languageCode, data.languageName), "problem-submissions")


    return (
        <div className={"flex justify-between w-[1000px] space-x-4 "}>
            <TextEditor value={value} setValue={setValue} isDisabled={false}/>
            <div className={"flex flex-col space-y-4 justify-center items-center"}>
                <Select onValueChange={(val) => {
                    const selected = languages.find(lang => lang.name === val);
                    if (selected) {
                        setLanguageCode(selected.code);
                        setLanguageName(selected.name)
                    }
                }}>
                    <SelectTrigger className="w-full text-white">
                        <SelectValue className={"text-white"} placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            languages.map((language) => (
                                <SelectItem  key={language.name} value={language.name}>{language.name}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                <Button disabled={isPending} onClick={
                    async () => {
                        if (languageCode && languageName) {
                            setTab("RESULTS")
                            await mutateAsync({value, problemId, languageCode, languageName})
                        }
                    }
                } className={"bg-white text-black hover:bg-gray-200"}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default Submit;
