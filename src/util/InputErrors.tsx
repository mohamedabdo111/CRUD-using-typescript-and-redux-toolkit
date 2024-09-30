const InputErrors = ({ msg }: { msg: string }) => {
  return msg ? <span className=" text-danger mx-2">{msg}</span> : null;
};

export default InputErrors;
