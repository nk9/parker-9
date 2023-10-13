// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#~;________'
    this.update = this.update.bind(this)
    this.textNodes = []
  }

  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  appendText(nextText) {
    const length = nextText.length
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = ''
      const to = nextText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }

    cancelAnimationFrame(this.frameRequest)
    this.frame = 0

    var node = document.createElement("div");
    this.el.appendChild(node)

    this.update()
    return promise

}

  update(element) {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }

    var element = this.el.lastChild;
    if (element) {
      element.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

function initIndex() {
  const phrases = [
    'Agent Parker',
    'Ninjago needs you.',
    'Garmadon\'s next attack is imminent.',
    'Time is running out.',
    'We need you to open Garmadon\'s safe',
    'and report what you find inside.',
    '',
    'Good luck.'
  ]

  const el = document.querySelector('.text')
  const fx = new TextScramble(el)

  let counter = 0
  const next = () => {
    fx.appendText(phrases[counter]).then(() => {
      if (counter < phrases.length) {
        setTimeout(next, 1000)
      }
    })
    counter = (counter + 1)
  }

  next()


  $('.reveal').delay(16000).fadeIn(1000)
}

function showSuccess() {
  const phrases = [
    'Computer analysis suggests you are on the right track',
    'but you may have received additional information.'
  ]
  const el = document.querySelector('.success')
  const fx = new TextScramble(el)

  let counter = 0
  const next = () => {
    fx.appendText(phrases[counter]).then(() => {
      if (counter < phrases.length) {
        setTimeout(next, 1500)
      }
    })
    counter = (counter + 1)
  }

  next()
}