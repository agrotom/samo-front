import { FormattedMessage } from "react-intl";
import InputSubmit from "../atoms/inputSubmit";
import TextHeader from "../atoms/text-header";
import LabeledInput from "../molecules/labeledInput";
import { useEffect, useState } from "react";

interface SignInFormClassNames {
    container?: string;
}

interface SignInFormProperties {
    classNames?: SignInFormClassNames;
}

export default function signInForm({ classNames }: SignInFormProperties) {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    useEffect(() => {
        setEmailError(!email.includes("@"));
    }, [email, password]);

    return (
        <div className={ `flex flex-col space-y-2 p-5 w-screen md:w-100 ${ classNames?.container }` }>
            <TextHeader text="login_header" className="mr-auto text-[25px]" />
            <LabeledInput label="Email" id="email" text={ email } error={ emailError } onChange={ e => setEmail(e.target.value) } placeholder="myemail@mail.com" classNames={ { container: "mt-10" } } />
            <LabeledInput label="password" translated={ true } id="password" text={ password } onChange={ e => setPassword(e.target.value) } placeholder="*******" />
            <InputSubmit text="login" translated={ true } id="submit" className="mt-5" />
            <div className="flex flex-row">
                <FormattedMessage id="no_account_question" />
                <a href="#" className="ml-1">
                    <FormattedMessage id="signup_proposal" />
                </a>
            </div>
        </div>
    );
}