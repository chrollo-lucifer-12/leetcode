import {Control, FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";


interface FormGeneratorProps {
    type?: "text" | "email" | "password" | "number" | "file" | "checkbox";
    inputType: "select" | "input" | "textarea";
    options?: any[]
    label?: string;
    placeholder?: string;
    register: UseFormRegister<any>;
    name: string;
    errors: FieldErrors<FieldValues>;
    lines?: number;
    control?: Control<any>; // Add this line
}

const FormGenerator = ({control,register,options,errors,name,placeholder,type,inputType,lines,label} : FormGeneratorProps) => {
    switch (inputType) {
        case "input": {
            return (
                <div className="mt-2 text-white flex flex-col">
                    <Label htmlFor={name} className="block mb-1">
                        {label}
                    </Label>
                    <Input
                        id={name}
                        className="
                            border
                            border-[#232325]
                            bg-black/50
                            text-white
                            placeholder-gray-500
                            focus:ring-2
                            focus:ring-blue-500
                        "
                        type={type}
                        placeholder={placeholder}
                        {...register(name)}
                    />
                    <ErrorMessage
                        name={name}
                        errors={errors}
                        render={({message}) => (
                            <p className="text-red-600 text-sm mt-1">{message}</p>
                        )}
                    />
                </div>
            );
        }
    }
}

export default FormGenerator