import { FormattedMessage } from "react-intl";
import LabeledInput from "../molecules/labeledInput";
import { useState } from "react";
import SignFormTemplate from "../templates/signFormTemplate";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/provider/authProvider";

interface SignInFormClassNames {
    container?: string;
}

interface SignInFormProperties {
    classNames?: SignInFormClassNames;
}

export default function SignInForm({ classNames }: SignInFormProperties) {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [error, setError] = useState<string>('');

    const { token, login, logout, isLoggedIn } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/");
        } catch (error: any) {
            setError(error);
        }
    };

    return (
        <div className={ `flex flex-col ${ classNames?.container }` }>
            <SignFormTemplate haderTextLocaleId="signin_header" submitTextLocaleId="signin" onSubmit={ handleSubmit }>
                <LabeledInput label="Email" id="email" text={ email } onChange={ e => setEmail(e.target.value) } placeholder="myemail@mail.com" />
                <LabeledInput label="password" translated={ true } id="password" text={ password } onChange={ e => setPassword(e.target.value) } placeholder="*******" />
            </SignFormTemplate>
            <div className="flex flex-row mx-auto">
                <FormattedMessage id="no_account_question" />
                <a href="/signup" className="ml-1 text-blue-400">
                    <FormattedMessage id="signup_proposal" />
                </a>
            </div>
            <p className="flex mx-auto">
                {error}
            </p>
        </div>
    );
}