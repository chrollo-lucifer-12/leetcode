"use client"

import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { addSubmission } from "@/actions/submissions";
import { useMutationData } from "@/hooks/useMutationData";
import TextEditor from "@/components/text-editor";

const languages = [
    { name: "C++ (GCC 9.2.0)", code: 54 },
    { name: "Python (3.8.1)", code: 71 },
    { name: "JavaScript (Node.js)", code: 63 },
    { name: "Java (OpenJDK 13)", code: 62 },
    { name: "C (GCC 9.2.0)", code: 50 }
];

const Submit = ({
                    problemId,
                    setTab,
                    setIsSubmitted
                }: {
    problemId: string,
    setTab: React.Dispatch<React.SetStateAction<"RESULTS" | "TASK" | "SUBMIT">>,
    setIsSubmitted :  React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [value, setValue] = useState("");
    const [languageCode, setLanguageCode] = useState(0);
    const [languageName, setLanguageName] = useState("");

    const { mutateAsync, isPending } = useMutationData(
        ["submit-solution"],
        (data) => addSubmission(data.value, data.problemId, data.languageCode, data.languageName),
        "problem-submissions"
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
                <TextEditor value={value} setValue={setValue} isDisabled={false} />
            </div>

            <div className="flex flex-col space-y-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Language
                    </label>
                    <Select
                        onValueChange={(val) => {
                            const selected = languages.find(lang => lang.name === val);
                            if (selected) {
                                setLanguageCode(selected.code);
                                setLanguageName(selected.name);
                            }
                        }}
                    >
                        <SelectTrigger className="w-full bg-gray-800 border-gray-600">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((language) => (
                                <SelectItem key={language.name} value={language.name}>
                                    {language.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    disabled={isPending || !languageName || !value.trim()}
                    onClick={async () => {
                        if (languageCode && languageName) {
                            setIsSubmitted(true);
                            await mutateAsync({ value, problemId, languageCode, languageName });
                            setTab("RESULTS");
                        }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                    {isPending ? (
                        <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                            Submitting...
                        </div>
                    ) : "Submit Solution"}
                </Button>

                <div className="text-sm text-gray-400 mt-4">
                    <p className="font-medium mb-1">Submission Guidelines:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Make sure your code handles all test cases</li>
                        <li>Select the appropriate language</li>
                        <li>Clean up any debug code before submitting</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Submit;