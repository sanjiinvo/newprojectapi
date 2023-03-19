import './style.scss'
import demo from "./demo.js";

import example from './images/image.png'

import htmlPicture from './images/html.png'

// const image = new Image()
//  image.src = example

// const demoElement = document.querySelector("#demo")
// demoElement.appendChild(image)

// const htmlPic = new Image()
// htmlPic.srs = htmlPicture



// const miniblock1 = document.querySelector('#mini1-img')
// miniblock1.appendChild(htmlPic)



// demo()
let arrayOfquest = []
let inputOfQuest = document.querySelector('#inp-quest')
let askbutton = document.querySelector('#toask')
let lastquestion = document.querySelector('#lastquest')
lastquestion.addEventListener('click',()=>{
    
    postData(arrayOfquest.at(-1))
    const ansText = document.querySelector('.answer-box') 
    
    ansText.innerHTML+=`
    <div class="my-question">
    <p class="my-question-text">
      ${arrayOfquest.at(-1)}
    </p>
  </div>
    `
})
inputOfQuest.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        postData(inputOfQuest.value)
        const ansText = document.querySelector('.answer-box') 
        ansText.innerHTML+=`
        <div class="my-question">
        <p class="my-question-text">
          ${inputOfQuest.value}
        </p>
      </div>
        `
    }

    
  });
askbutton.addEventListener('click',()=>{
    
    postData(inputOfQuest.value)
    const ansText = document.querySelector('.answer-box') 
    ansText.innerHTML+=`
    <div class="my-question">
    <p class="my-question-text">
      ${inputOfQuest.value}
    </p>
  </div>
    `
})


async function postData(question) {
    
    arrayOfquest.push(inputOfQuest.value)
    
    const url = "https://api.openai.com/v1/completions"
    const data = {
        "model": "text-davinci-003",
        "prompt": `${question}`,
        "max_tokens": 512,
        "temperature": 0.7,
        "frequency_penalty": 0,
        "presence_penalty": 0,
    }
    console.log(data);
    console.log(arrayOfquest.at(-1));

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Authorization':"Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      const responseAnswer = await response.json()
      const ansText = document.querySelector('.answer-box') 
      console.log(responseAnswer);
      let fullAnswer = responseAnswer.choices[0].text
      console.log(arrayOfquest);
      inputOfQuest.value=``
      ansText.innerHTML+= `
      <div class="answer num-">
      <p class="answer-text">
        ${fullAnswer}
      </p>
      <img class="answer-img" src="" alt="">
    </div>
    `
}

// Here is a random image: ![RandomImage](https://i.imgur.com/xuZDnC1.jpg)  
// troubleshoot
