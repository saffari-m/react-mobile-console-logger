let LOG_PREFIX = "React-Console-Logger";
const LogLevels = ["info", "warn", "error", "log", "debug", "count"];
const OldLogFunction = {};
const LogList = [];

const ConsoleWrapper = function () {};

function setLogPrefix(val) {
  if (val !== undefined && val !== null) LOG_PREFIX = val;
}
function getLogPrefix() {
  return LOG_PREFIX;
}
function globalErrorHandler() {
  if (typeof window !== "undefined") {
    window.onerror = function (message, source, lineno, colno, error) {
      console.error([message, source, lineno, colno].join(" "));
    };
    window.onabort = function (e) {
      console.error(e);
    };
  }
}
function registerListeners() {
  if (typeof document !== "undefined") {
    document.addEventListener("log-update", logUpdate);
  }
}
function dispatch(name, data) {
  if (name === undefined || name === "" || name === null) return;
  if (typeof document !== "undefined") {
    const event = new CustomEvent(name, { detail: data });
    document.dispatchEvent(event);
  }
}
function printOnDom(title, body, options = {}) {
  if (title === undefined || title === null) return;
  if (body === undefined || body === null) return;
  const { type } = options;
  const logRow = document.createElement("div");
  const logTitle = document.createElement("span");
  const logBody = document.createElement("p");

  logRow.classList.add("log-row");
  logRow.setAttribute("logtype", type || "log");

  logTitle.classList.add("log-title");
  logTitle.appendChild(document.createTextNode(title));

  logBody.classList.add("log-body");
  logBody.appendChild(document.createTextNode(body));

  logRow.appendChild(logTitle);
  logRow.appendChild(logBody);
  return logRow;
}
function logUpdate(e) {
  debugger;
  if (typeof document !== "undefined") {
    const data = e.detail ?? null;
    const cont = document.getElementById("console-container");
    if (cont) {
      if (data) {
        const { title, type, body } = data;
        if (body.hasOwnProperty("length")) {
          if (body.length >= 0 && typeof body[0] === "string") {
            const logRow = printOnDom(title, body[0], { type: type });
            cont.appendChild(logRow);
          }
        }
      }
    }
  }
}

function validateAndBind(source, target = null) {
  if (source === undefined && source === null)
    throw "Source value is undefined or null.";
  if (target === undefined && target === undefined)
    throw "Target value is undefined or null.";
  if (typeof target !== "function") throw "Target is not a function!";
  target(source);
}

function init(logprefix) {
  validateAndBind(logprefix, setLogPrefix);
  bind();
  registerListeners();
  globalErrorHandler();
}
function bind() {
  LogLevels.map((level) => {
    OldLogFunction[level] = console[level];
    console[level] = function () {
      dispatch("log-update", {
        title: `${level.toUpperCase()}: ${getLogPrefix()} - `,
        type: level,
        body: arguments,
      });
      OldLogFunction[level].apply(console, arguments);
    };
  });
}

ConsoleWrapper.prototype.setLogPrefix = setLogPrefix;
ConsoleWrapper.prototype.getLogPrefix = getLogPrefix;
ConsoleWrapper.prototype.validateAndBind = validateAndBind;
ConsoleWrapper.prototype.init = init;
ConsoleWrapper.prototype.bind = bind;

export { ConsoleWrapper };
