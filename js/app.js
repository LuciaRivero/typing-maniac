module.exports = {
  context: document.querySelector(".app"),
  words: [],
  elementsToRender: [],
  wordToSearch: "",

  verifyInput(e) {
    const keyPressed = e.key;

    switch (e.keyCode) {
      case 8:
        this.wordToSearch = this.wordToSearch.substring(0, this.wordToSearch.length - 1);
        break;

      case 13:
        if (this.words.includes(this.wordToSearch)) {
          document.querySelector(".counter").innerHTML = 5;
        }

        break;

      default:
        this.wordToSearch = this.wordToSearch.concat(keyPressed);


        document.querySelector(".typedText").innerHTML = this.wordToSearch;

        this.elementsToRender
          .filter(w => w.textContent.startsWith(this.wordToSearch))
          .forEach(w => {
            const word = w.textContent;
            const wordToHighlight = word.substring(0, this.wordToSearch.length);
            const diff = word.substring(this.wordToSearch.length, word.length);
            const highLight = document.createElement("mark");

            highLight.innerHTML = wordToHighlight;

            w.textContent = "";
            w.appendChild(highLight);
            w.append(diff);
          });
    }
  },

  init() {
    document.onkeydown = this.verifyInput.bind(this);

    const asd = document.createElement("span");
    const qwe = document.createElement("span");

    asd.innerHTML = "asd";
    qwe.innerHTML = "qwe";

    this.elementsToRender.push(asd);
    this.elementsToRender.push(qwe);

    this.elementsToRender
      .forEach(w => {
        this.words.push(w.textContent);
        this.context.appendChild(w);
        this.context.appendChild(document.createElement("br"));
      });

  },

};
