interface SpinnerClassNames {
    container?: string;
    spinner?: string;
}

interface SpinnerProperties {
    classNames?: SpinnerClassNames;
}

export default function Spinner({ classNames }: SpinnerProperties) {
  return (
    <div className={`flex justify-center items-center h-32 ${ classNames?.container }`}>
      <div className={`w-10 h-10 border-4 border-active-bar border-t-transparent rounded-full animate-spin ${ classNames?.spinner }`}></div>
    </div>
  );
}