import { FormattedMessage, useIntl } from "react-intl";
import LabeledInput from "../molecules/labeledInput";
import { useEffect, useState } from "react";
import SignFormTemplate from "../templates/signFormTemplate";
import LabeledInputDate from "../molecules/labeledInputDate";
import { useNavigate } from "react-router-dom";
import { register } from "@/api/auth";

interface SignInFormClassNames {
    container?: string;
}

interface SignInFormProperties {
    classNames?: SignInFormClassNames;
}

export default function SignUpForm({ classNames }: SignInFormProperties) {

    const intl = useIntl();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [sureName, setSureName] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [birthDate, setBirthDate] = useState<Date>(new Date());
    const [achieve, setAchieve] = useState<string>('');

    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [birthDateError, setBirthDateError] = useState<boolean>(false);

    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.includes("@") || email == '') {
            setError(intl.formatMessage({ id: "error_bad_email" }))
            return;
        }

        if (sureName == '') {
            setError(intl.formatMessage({ id: "error_bad_sure_name" }))
            return;
        }

        if (firstName == '') {
            setError(intl.formatMessage({ id: "error_bad_first_name" }))
            return;
        }

        if (password.length < 16) {
            setError(intl.formatMessage({ id: "error_short_password" }));
            return;
        }

        if (birthDate.getDate() > new Date().getDate()) {
            setError(intl.formatMessage({ id: "error_birth_date_error" }))
            return;
        }

        try {
            await register(email, password, sureName, firstName, birthDate, achieve);
            navigate("/signin");
        } catch (error: any) {
            var errorMessage = "error_unknown";
            
            if (error == "user_exists") {
                errorMessage = "error_register_failed_exists"
            }
            else if (error == "bad_credentials") {
                errorMessage = "error_register_failed_bad"
            }
            
            setError(intl.formatMessage({ id: errorMessage }));
        }
    };

    useEffect(() => {
        setEmailError(email != '' && !email.includes("@"));
        setPasswordError(password != '' && password.length < 16);
        setBirthDateError(new Date(birthDate).getDate() < new Date().getDate());
    }, [email, password]);

    return (
        <div className={ `flex flex-col ${ classNames?.container }` }>
            <SignFormTemplate haderTextLocaleId="signup_header" submitTextLocaleId="signup" onSubmit={ handleSubmit } classNames={ { container: "mx-auto" } } >
                <LabeledInput label="Email" id="email" text={ email } error={ emailError } onChange={ e => setEmail(e.target.value) } placeholder="myemail@mail.com" />
                <LabeledInput label="password" translated={ true } id="password" text={ password } error={ passwordError } onChange={ e => setPassword(e.target.value) } placeholder="*******" />
                <LabeledInput label="sureName" translated={ true } id="sureName" text={ sureName } onChange={ e => setSureName(e.target.value) } placeholder="Иванов" />
                <LabeledInput label="firstName" translated={ true } id="firstName" text={ firstName } onChange={ e => setFirstName(e.target.value) } placeholder="Иван" />
                <LabeledInputDate label="birthDate" translated={ true } id="birthDate" error={ birthDateError } selectedDate={ birthDate } setSelectedDate={ setBirthDate } placeholder="01.01.1990" />
                <LabeledInput label="achieve" translated={ true } id="achieve" text={ achieve } onChange={ e => setAchieve(e.target.value) } placeholder={ intl.formatMessage({ id: "achieve_placeholder" }) } />
            </SignFormTemplate>
            <div className="flex flex-row mx-auto">
                <FormattedMessage id="has_account_question" />
                <a href="/signin" className="ml-1 text-blue-400">
                    <FormattedMessage id="signin_proposal" />
                </a>
            </div>
            <p className="flex mx-auto text-center">
                {error}
            </p>
        </div>
    );
}