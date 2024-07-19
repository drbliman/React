import "../../../public/css/header/button.scss";

interface ButtonProps {
  className?: string;
  textContent?: string;
}

const Button = (props: ButtonProps) => {
  const { className } = props;
  const { textContent } = props;

  const customEvent =
    className?.includes("buttonSearch") ? "searchEvent" : "errorEvent";

  const handleClick = () => {
    const event = new CustomEvent(customEvent);
    window.dispatchEvent(event);
  };

  return (
    <button className={className} id={className} onClick={handleClick}>
      {textContent}
    </button>
  );
};

export default Button;
