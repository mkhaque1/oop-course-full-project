// --- OOP Logic (Same as your project) ---

class Device {
  #serialNumber;
  constructor(name, brand) {
    this.name = name;
    this.brand = brand;
    this.#serialNumber = Math.random().toString(36).slice(2, 10).toUpperCase();
    this.isOn = false;
  }
  toggle() {
    this.isOn = !this.isOn;
    logToTerminal(`${this.name} is now ${this.isOn ? "ON" : "OFF"}.`);
    return this.isOn;
  }
  getSerial() {
    return this.#serialNumber;
  }
}

class SmartLight extends Device {
  constructor(name, brand, color) {
    super(name, brand);
    this.color = color;
    this.brightness = 100;
  }
  setBrightness(level) {
    this.brightness = level;
    logToTerminal(`${this.name} brightness: ${level}%`);
  }
}

class SmartPhone extends Device {
  takePhoto() {
    if (this.isOn) {
      logToTerminal(`📸 ${this.name} captured a high-res photo!`);
    } else {
      logToTerminal(`❌ Error: Turn on ${this.name} first.`);
    }
  }
}

// --- Initialization ---
const livingRoomLight = new SmartLight("Main Light", "Philips", "Warm White");
const myPhone = new SmartPhone("iPhone 15", "Apple", "256GB");

// --- UI Logic ---
function logToTerminal(msg) {
  const terminal = document.getElementById("terminal");
  terminal.innerHTML += `<div class="mb-1">> ${msg}</div>`;
  terminal.scrollTop = terminal.scrollHeight;
}

function handleLightToggle() {
  const status = livingRoomLight.toggle();
  const btn = document.getElementById("light-btn");
  const icon = document.getElementById("light-icon");
  const statusLabel = document.getElementById("light-status");
  const controls = document.getElementById("light-controls");

  if (status) {
    btn.innerText = "Turn Off";
    btn.classList.replace("bg-blue-600", "bg-red-600");
    icon.classList.replace("text-slate-500", "text-yellow-400");
    statusLabel.innerText = "ON";
    statusLabel.classList.replace("bg-slate-700", "bg-green-500/20");
    controls.classList.remove("hidden");
  } else {
    btn.innerText = "Turn On";
    btn.classList.replace("bg-red-600", "bg-blue-600");
    icon.classList.replace("text-yellow-400", "text-slate-500");
    statusLabel.innerText = "OFF";
    statusLabel.classList.replace("bg-green-500/20", "bg-slate-700");
    controls.classList.add("hidden");
  }
}

function handleBrightness(val) {
  livingRoomLight.setBrightness(val);
  document.getElementById("light-icon").style.opacity = val / 100;
}

function handlePhoneToggle() {
  const status = myPhone.toggle();
  const btn = document.getElementById("phone-btn");
  const icon = document.getElementById("phone-icon");
  const statusLabel = document.getElementById("phone-status");

  if (status) {
    btn.innerText = "Power Off";
    btn.classList.replace("bg-blue-600", "bg-red-600");
    icon.classList.replace("text-slate-500", "text-blue-400");
    statusLabel.innerText = "ON";
    statusLabel.classList.replace("bg-slate-700", "bg-green-500/20");
  } else {
    btn.innerText = "Power On";
    btn.classList.replace("bg-red-600", "bg-blue-600");
    icon.classList.replace("text-blue-400", "text-slate-500");
    statusLabel.innerText = "OFF";
    statusLabel.classList.replace("bg-green-500/20", "bg-slate-700");
  }
}

function handleCamera() {
  myPhone.takePhoto();
}
