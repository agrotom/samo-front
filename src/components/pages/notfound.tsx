import { FormattedMessage } from "react-intl";

export default function NotFound() {
    return (
        <span>
            <FormattedMessage id={ "page_not_found" } />
        </span>
    );
}