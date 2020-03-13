export class VoiceControl {
  constructor(lang = "ru-RU") {
    this.lang = lang;
  }

  listen = ({ timeout = 4000, text, onRecognize, onTimeout }) => {
    const Recognition = window.webkitSpeechRecognition;
    this.recognition = new Recognition();

    this.recognition.lang = this.lang;

    this.recognition.start();

    this.timeoutListener = setTimeout(() => {
      this.recognition.stop();
      onTimeout && onTimeout();
    }, timeout);

    this.recognition.onresult = event => {
      if (String(event.results.item(0).item(0).transcript).includes(text)) {
        clearTimeout(this.timeoutListener);
        this.recognition.stop();
        onRecognize && onRecognize();
      }
    };
  };

  speak = ({ text, onEnd }) => {
    const { speechSynthesis } = window;
    this.speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
    this.speechSynthesisUtterance.lang = this.lang;

    speechSynthesis.speak(this.speechSynthesisUtterance);

    this.onEndListener = () => {
      onEnd && onEnd();
    };

    this.speechSynthesisUtterance.addEventListener("end", this.onEndListener);
  };

  clearListeners() {
    if (this.timeoutListener) clearTimeout(this.timeoutListener);
    if (this.recognition) this.recognition.stop();
    if (this.onEndListener)
      this.speechSynthesisUtterance.removeEventListener(
        "end",
        this.onEndListener
      );
  }
}
