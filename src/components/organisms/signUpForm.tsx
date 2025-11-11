import { FormattedMessage, useIntl } from "react-intl";
import LabeledInput from "../molecules/labeledInput";
import { useEffect, useState } from "react";
import SignFormTemplate from "../templates/signFormTemplate";
import Calendar from "../molecules/calendar";
import { format } from "date-fns";
import { ru } from "react-day-picker/locale";
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
    const [birthDate, setBirthDate] = useState<string>('01.01.1990');
    const [achieve, setAchieve] = useState<string>('');

    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [sureNameError, setSureNameError] = useState<boolean>(false);
    const [firstNameError, setfirstNameError] = useState<boolean>(false);
    const [birthDateError, setBirthDateError] = useState<boolean>(false);

    const [error, setError] = useState<string>('');

    const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password.length < 16) {
            setError(intl.formatMessage({ id: "error_short_password" }));
        }

        try {
            await register(email, password, sureName, firstName, new Date(birthDate), achieve);
            navigate("/signin");
        } catch (error: any) {
            setError(error.message || intl.formatMessage({ id: "error_register_failed" }));
        }
    };

    useEffect(() => {
        setEmailError(email != '' && !email.includes("@"));
        setPasswordError(password != '' && password.length < 16);
    }, [email, password]);

    return (
        <div className={ `flex flex-col ${ classNames?.container }` }>
            <SignFormTemplate haderTextLocaleId="signup_header" submitTextLocaleId="signup" onSubmit={ handleSubmit }>
                <LabeledInput label="Email" id="email" text={ email } error={ emailError } onChange={ e => setEmail(e.target.value) } placeholder="myemail@mail.com" />
                <LabeledInput label="password" translated={ true } id="password" text={ password } error={ passwordError } onChange={ e => setPassword(e.target.value) } placeholder="*******" />
                <LabeledInput label="sureName" translated={ true } id="sureName" text={ sureName } onChange={ e => setSureName(e.target.value) } placeholder="Иванов" />
                <LabeledInput label="firstName" translated={ true } id="firstName" text={ firstName } onChange={ e => setFirstName(e.target.value) } placeholder="Иван" />
                <LabeledInputDate label="birthDate" translated={ true } id="birthDate" text={ format(birthDate, "dd.MM.yyyy", { locale: ru }) } onChange={ e => setBirthDate(e.target.value) } placeholder="01.01.1990" />
                <LabeledInput label="achieve" translated={ true } id="achieve" text={ achieve } onChange={ e => setAchieve(e.target.value) } placeholder={ intl.formatMessage({ id: "achieve_placeholder" }) } />
            </SignFormTemplate>
            <div className="flex flex-row mx-auto">
                <FormattedMessage id="has_account_question" />
                <a href="/signin" className="ml-1 text-blue-400">
                    <FormattedMessage id="signin_proposal" />
                </a>
            </div>
            <p className="flex mx-auto">
                {error}
            </p>
            <Calendar open={ calendarOpen } setOpen={ setCalendarOpen } onChange={ date => setBirthDate(date.toLocaleDateString()) } />
        </div>
    );
}