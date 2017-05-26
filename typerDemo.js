var directory = JSON.parse('{"about":["about.txt"],"experience":["summer2015.txt", "summer2016.txt"],"projects":["github.txt"],"myResume.pdf":[],"contact.txt":[]}');

//let currentDirectory = document.getElementById('b').innerText;

typer('#area',7).line("<p style= 'text-align: center'>Welcome to my console based website!</p>")
              .line("<p style= 'text-align: center'>This is an experement to help me with my JavaScript and CSS abilities.</p>")
              .line("<p style= 'text-align: center'>While your here, use dir/ls to get the contents of a directory,</p>")
              .line("<p style= 'text-align: center'>cat -filename- to get more info on it, clr or clear to clear your screen,</p>")
              .line("<p style= 'text-align: center'>cd -directory- to change to that directory,</p>")
              .line("<p style= 'text-align: center'>type help if you want to see this prompt again.</p>")
              .line("<p style= 'text-align: center'>Use cd .. if you want to get back to the root directory.</p>").end();

kinput.onkeydown = handle;

let lastTime = Date.now();

function handle(e) {

  if(e.key == "Enter"){
    clearScreen();
    evaluateInput(document.getElementById('kinput').value);
  }
  if(e.key == "Tab"){
    e.preventDefault();
    var args = document.getElementById('kinput').value.split(" ");
    document.getElementById('kinput').value = "";
    if(args[args.length-1]){
      for(var i=0;i<args.length-1;i++){
        document.getElementById('kinput').value += args[i] + " ";
      }
      var dir = autocomplete(args[1],listDirectory(document.getElementById('b').innerText));
      document.getElementById('kinput').value += dir;
    }
  }
}

function evaluateInput(input){
  area.value += input;
  area.value += '\n';

  //Commands that I want to support....
  //cat -> For showing information
  //ls -> To see what people can look at
  //cd -> change directory?
  //cls/clear -> clears the screen
  //Directory Structure:
  //~   -> /about       -> about.txt
  //       /experience  -> summer2015.txt summer2016.txt
  //       /projects    -> github link? github.txt
  //       myResume.txt
  //       contact.txt

  var args = input.split(" ");
  var argc = args.length;

  if(args.length > 2){
    displayHelp();
  }

  switch (args[0]) {
    case "cat":
        openFile(args[1]);
      break;
    case "ls":
    case "dir":
      console.log("Displaying directory for "+ document.getElementById('b').innerText);
      var list = listDirectory(document.getElementById('b').innerText);
      for (var i=0;list[i];i++) {
        typer('#area',7).line(list[i]).end();
      }
      break;
    case "cd":
      changeDirectory(args[1]);
      break;
    case "clr":
    case "clear":
      clearScreen();
      break;
    case "help":
    typer('#area',7).line("<p style= 'text-align: center'>Welcome to my console based website!</p>")
                  .line("<p style= 'text-align: center'>This is an experement to help me with my JavaScript and CSS abilities.</p>")
                  .line("<p style= 'text-align: center'>While your here, use dir/ls to get the contents of a directory,</p>")
                  .line("<p style= 'text-align: center'>cat -filename- to get more info on it, clr or clear to clear your screen,</p>")
                  .line("<p style= 'text-align: center'>cd -directory- to change to that directory,</p>")
                  .line("<p style= 'text-align: center'>type help if you want to see this prompt again.</p>")
                  .line("<p style= 'text-align: center'>Use cd .. if you want to get back to the root directory.</p>").end();

      break;
    default:
    typer('#area',7).line("Bad Command").end();

  }

  document.getElementById('kinput').value = "";
}


function displayHelp(){
  typer('#area',7).line("help message").end();
}

function clearScreen(){
  document.getElementById('area').innerText = "";
}

function changeDirectory(newDirectory){
  if(newDirectory === ".."){
    document.getElementById('b').innerText = "~";
    typer('#area',7).line("You have changed your directory to: "+document.getElementById('b').innerText).end();

  }else{
    if(newDirectory.endsWith("/")){
      let paths = listDirectory(document.getElementById('b').innerText);
      var isDirectoryThere = false;
      for(var i=0;paths[i];i++){
        if(paths[i] === newDirectory || paths[i].substring(0,paths[i].length-1)===newDirectory){
          isDirectoryThere = true;
        }
      }
      if(isDirectoryThere){
        document.getElementById('b').innerText += "/"+newDirectory;
        typer('#area',7).line("You have changed your directory to: "+document.getElementById('b').innerText).end();
      }else{
        console.log("Couldnt find specified directory");
      }
    }else{
      console.log("The specified resource is not a directory");
    }
  }
}

// takes a text field and an array of strings for autocompletion
function autocomplete(input, data) {
    var candidates = []
    // filter data to find only strings that start with existing value
    for (var i=0; i < data.length; i++) {
      if (data[i].indexOf(input) == 0 && data[i].length > input.length)
        candidates.push(data[i])
    }

    if (candidates.length > 0) {
      // some candidates for autocompletion are found
      if (candidates.length == 1) return candidates[0]
      else return longestInCommon(candidates, input.length)
    }
}

// finds the longest common substring in the given data set.
// takes an array of strings and a starting index
function longestInCommon(candidates, index) {
  var i, ch, memo
  do {
    memo = null
    for (i=0; i < candidates.length; i++) {
      ch = candidates[i].charAt(index)
      if (!ch) break
      if (!memo) memo = ch
      else if (ch != memo) break
    }
  } while (i == candidates.length && ++index)

  return candidates[0].slice(0, index)
}

function listDirectory(givenDirectory){
  let result = [];
  let path = givenDirectory.split("/");
  if(path.length > 1){
    console.log(directory);
    var i;
    for(i=1;path[i];i++){
      var j;
      for(j=0;directory[path[i]][j];j++){
        console.log(directory[path[i]][j]);
        result.push(directory[path[i]][j]);
      }
    }
  }else{
    for(var p in directory){
      if(!p.includes(".")){
        console.log(p.concat('/'));
        result.push(p.concat('/'));
      }else{
        console.log(p);
        result.push(p);
      }
    }
  }
  return result;
}

function openFile(fileName){
  let files = listDirectory(document.getElementById('b').innerText);
  var foundFile = false;
  for(var i=0;i<files.length;i++){
    if(fileName === files[i]){
      foundFile = true;
      break;
    }
  }
  if(foundFile){
    var fileSplitName = fileName.split(".");
    if(fileSplitName[1] === "pdf"){
      window.open('2016FResume.pdf');
    }
    printFileInfo(fileSplitName[0]);
  }else{
    console.log("File did not exist.");
  }
}

function printFileInfo(fileName) {
  switch (fileName) {
    case "contact":
    clearScreen();
      typer('#area',7)
        .line("<p style= 'text-align: center'>Let's Get In Touch!")
        .line("Links: ")
        .line('<a href="https://github.com/nab0310">Github</a> Email: nickbehrensa@gmail.com <a href= "https://www.linkedin.com/in/nicholas-behrens-babb89a4?trk=hp-identity-name">Linkedin</a> ')
        .end();
      break;
    case "about":
      clearScreen();
      document.getElementById('area').innerHTML += '<img src="./IMG_1324.JPG" align="right" height="200" width="150" style="display:inline">';
      typer('#area',7)
        .line("I am a software developer with an intrest in helping others.")
        .line('<p class="text-faded">If I am not working feverishly on my school projects, you can find me <a href="https://github.com/nab0310?utf8=%E2%9C%93&tab=repositories&q=twitter&type=&language=">creating Twitter bots</a>, <a href="https://github.com/nab0310/327Spring2017">making adventure games</a>, or <a href="https://ignitecs.withgoogle.com/">teaching high schoolers the importance of coding</a>.</p></p>')
        .line("While you're here be sure to check out my <a href=https://github.com/nab0310>Github</a> for more projects!")
      .end();
      break;
    case "summer2016":
      typer('#area',7).line('<h3>Baxter Credit Union, Summer 2016</h3><li>Completely rewrote console applications in order to reduce dependencies on other systems.</li><li>Developed new structure of interfaces that reduced dependencies on third party vendors.</li><li>Developed applications using interfaces, dependency injection, and SQL to meet business needs.</li>').end();
      break;
    case "summer2015":
      typer('#area',7).line('<h3>Baxter Credit Union, Summer 2015</h3><li>Worked to streamline and optimize communication between Web Banking and back end operations.</li><li>Designed VB.net programs to automate the process of welcoming customers to the Credit Union.</li>').end();
      break;
    case "github":
      goToGithub();
      break;
    default:

  }

}

function goToLinkedin(){
  window.open('https://www.linkedin.com/in/nicholas-behrens-babb89a4?trk=hp-identity-name');
}

function goToGithub(){
  window.open('https://github.com/nab0310');
}

// let element = document.querySelector('#search-line');
// typer(element)
//   .line('How cool is this?')
//   .line('So very cool.')
//   .line('Agreed!');
