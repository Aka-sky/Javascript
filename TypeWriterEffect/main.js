class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.wait = wait;
    this.txt = "";
    this.wordIndex = 0;
    this.isDeleting = false;
    // call the type function
    this.type();
  }

  type() {
    // Index of current word
    let index = this.wordIndex % this.words.length;
    // Full word/ text at current index
    let fullTxt = this.words[index];

    // Check if is deleting
    if(this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0,this.txt.length - 1);
    } else {
        // Add next char
        this.txt = fullTxt.substring(0,this.txt.length + 1);
    }

    // Insert into HTML
    document.querySelector(".txt-type").innerHTML = `<span class ="txt border-blink">${this.txt}</span>`

    // Initial type speed
    let typeSpeed = 300;

    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    // Check if txt is full text
    if (this.txt === fullTxt && !this.isDeleting) {
        // To start deleting from next round 
        this.isDeleting = true;
        // To wait for some time to show the complete letter 
        typeSpeed = this.wait;
    } else if(this.txt === '' && this.isDeleting) {
        // To start next word
        this.wordIndex++;
        // Set is deleting to false to print next word
        this.isDeleting = false;
        // Little pause before next letter
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}
}


document.addEventListener("DOMContentLoaded", init);

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = parseInt(txtElement.getAttribute("data-wait"));

  // Init the Typewriter class to automate the type function call from
  // constructor 
  new TypeWriter(txtElement, words, wait);
}
