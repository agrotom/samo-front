import InputSubmit from "../atoms/inputSubmit";
import TextHeader from "../atoms/text-header";

interface SignInFormClassNames {
    container?: string;
}

interface SignInFormProperties {
    haderTextLocaleId: string;
    submitTextLocaleId: string;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    children?: React.ReactNode | React.ReactNode[];
    classNames?: SignInFormClassNames;
}

export default function signFormTemplate({ haderTextLocaleId, submitTextLocaleId, onSubmit, children, classNames }: SignInFormProperties) {
    return (
        <div className={ `flex flex-col space-y-2 p-5 w-screen md:w-100 ${ classNames?.container }` }>
            <TextHeader text={ haderTextLocaleId } className="mr-auto text-[25px]" />
            <form onSubmit={ onSubmit }>
                {
                    children
                }
                <InputSubmit text={ submitTextLocaleId } translated={ true } id="submit" className="w-full mt-5" />
            </form>
        </div>
    );
}