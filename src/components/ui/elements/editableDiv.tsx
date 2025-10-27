import { useState } from "react";

interface InlineEditableTextClassNames {
    container?: string;
    input?: string;
    span?: string;
}

interface InlineEditableTextProperties {
    initText: string;
    onChange?: (data: string) => void;
    onBlur?: () => void;
    initEditing?: boolean;
    editingAllow?: boolean;
    limit?: number;
    numberOnly?: boolean;
    className?: string;
    classNames?: InlineEditableTextClassNames;
}

export default function InlineEditableText({ initText = '', onChange, onBlur, limit, numberOnly = false, initEditing = false, editingAllow = true, classNames = { container: '', input: '', span: '' } }: InlineEditableTextProperties) {
  const [text, setText] = useState(initText.slice(0, limit));
  const [editing, setEditing] = useState(initEditing);

  return (
    <div className={classNames.container}>
      {editing && editingAllow ? (
        <input
          autoFocus
          type="text"
          value={text}
          onChange={(e) => { setText(e.target.value); onChange?.(e.target.value); }}
          onBlur={(e) => { setEditing(false); onBlur?.(); onChange?.(e.target.value); }}
          className={`border-b-2 border-active-bar dark:border-active-bar-dark bg-transparent focus:outline-none text-left ${classNames.input}`}
          maxLength={limit}
          onKeyDown={(event) => {
            if (numberOnly && event.key != "Backspace" && !/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      ) : (
        <span
          onClick={() => setEditing(true)}
          className={`transition-colors whitespace-normal break-words w-1 ${classNames.span}`}
        >
          {text == '' ? 'Введите текст' : text}
        </span>
      )}
    </div>
  );
}