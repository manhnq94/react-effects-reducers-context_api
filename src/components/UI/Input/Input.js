import classes from "./Input.module.css";
const Input = (props) => {
    return (
        <div
            className={`${classes.control} ${
                props.isValid === false ? classes.invalid : ""
            }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                type={props.type}
                className={props.className}
                onChange={props.onChange}
                onBlur={props.onBlur}
                value={props.value}
            ></input>
        </div>
    );
};

export default Input;
