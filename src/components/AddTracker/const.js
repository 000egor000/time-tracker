const defaultTime = +import.meta.env.VITE_DEFAULT_TIME;
const defaultAddTimer = {
  timer: defaultTime,
  description: "",
  dataStart: "",
  dataEnd: "",
  status: null,
  seconds: 0,
  isActive: false,
};

export { defaultAddTimer };
