const fs = require('fs')

const readline = require('readline');  
var currentFile = 'sample-input.txt' //default Filename of drink competition votes
const drinks = [] // Final drink results
const points = [5,3,2,1,0] //Points for drinks

//Find index of drink from name of drink
const getDrinkIndex = (drinkName)=>((drinks.map(e=> e.name).indexOf(drinkName)))
//Return a string in the format based on the template
const displayDrink = (drink)=>(`${drink.rank}. ${drink.name}, ${drink.points} pts\n`)

//Sort drinks first by points. If points are the same then sort by length of name
const sortDrinks = (drinks)=>
    { 
        var sorted = drinks.sort((a,b)=>{
            if (a.points>b.points) return -1
            if (a.points<b.points) return 1
    
            if (a.name.length<b.name.length) return -1
            if (a.name.length>b.name.length) return 1
        })
        return(sorted)}

//Rank the drinks based of the points and length of name.
const rankDrinks = (drinks) =>{
    var currentPlace=1;
    var offset=0;
    var result = drinks.map((drink,idx)=>{
        if(idx>0){
            if(drinks[idx-1].points===drink.points){
                ++offset
            }else{
                offset=0
            }
        }
        drink["rank"] = currentPlace-offset
        ++currentPlace
        return(drink)
    })
    return(result)
}

//Add/Update Drinks
const updateDrinkRating = drink =>{
    drinkIndex = getDrinkIndex(drink.name)
    if(drinkIndex===-1){
        drinks.push(drink)
    }else{
        drinks[drinkIndex].points += drink.points
    }
}

//Gets points from array of possible point values
const getDrinkPoints = (rank) => (points[rank-1])

//Received input from the file and parse each line passed.
const parseDrink = (line) => ({
    name:line.substring(0,line.length-1).trim(),
    points:getDrinkPoints(line.slice(-1))
})

//Reads file
const readFile = () =>{
    try {
        if (fs.existsSync(currentFile))
            {
                var rl = readline.createInterface({
                    input: fs.createReadStream(currentFile),
                    output:outputStream(),
                    terminal: false
                });

                rl.on('line', function(line){
                    updateDrinkRating(parseDrink(line))
                })

                rl.on('close', function() {
                    sortDrinks(drinks)
                    rankDrinks(drinks)
                    drinks.map(drink=>process.stdout.write(displayDrink(drink)))
                });
            }else{
                process.stdout.write(`The file '${currentFile}' does note exist`)
            }           
        } catch(err) {
            console.log(err)
      }
}

const outputStream = () => {
    var currentPlace=1;
                    drinks.map((drink,idx)=>{
                        if(idx>0){
                            if(drinks[idx-1].points===drink.points){
                                --currentPlace
                            }
                        }
                        process.stdout.write(`${currentPlace}. ${drink.name}, ${drink.points} pts\n`)
                        ++currentPlace
                        })
}

const Start = () => {
    if(process.argv[2]){
        currentFile = process.argv[2]
    }
    readFile(currentFile)
}

Start();

module.exports= { displayDrink,rankDrinks,sortDrinks,getDrinkPoints,parseDrink,updateDrinkRating}


