const expect = require("chai").expect
var chai = require('chai');
chai.use(require('chai-string'));
const app = require('../app')



describe('App',function(){
    it('App should return proper sentence structure per entry', function(){
        let result = app.displayDrink(sortedArrayWithRank[0])
        expect(result).to.equalIgnoreCase('1. Banana Cabana, 10 pts\n')
    })
    it('App should parse drink into object', function(){
        let result = app.parseDrink("Banana Cabana 1")
        expect(result).to.deep.equal({
                name:'Banana Cabana',
                points:5
        })
    })
    it('App should sort drinks first by total points, Then by length of name', function(){
        let result = app.sortDrinks(unsortedArray)
        expect(result).to.deep.equal(sortedArray) 
    })
    it('App should rank drinks with items that have the same point value also have the same rank', function(){
        let result = app.rankDrinks(unsortedArrayDoubleSamePoints)
        expect(result).to.deep.equal(unsortedArrayDoubleSamePointsWithRank) 
    })
})

describe('Points by rank',function(){
    it('Drink with rank of 1 should get 5 points', function(){
        let result = app.getDrinkPoints(1)
        expect(result).to.equal(5)
    })
    it('Drink with rank of 2 should get 3 points', function(){
        let result = app.getDrinkPoints(2)
        expect(result).to.equal(3)
    })
    it('Drink with rank of 3 should get 2 points', function(){
        let result = app.getDrinkPoints(3)
        expect(result).to.equal(2)
    })
    it('Drink with rank of 4 should get 1 points', function(){
        let result = app.getDrinkPoints(4)
        expect(result).to.equal(1)
    })
    it('Drink with rank of 5 should get 0 points', function(){
        let result = app.getDrinkPoints(5)
        expect(result).to.equal(0)
    })
})

describe('Interview Candidate',function(){
    it('Mathew Mozer gets in person interview with Substantial', function(){
        expect(1).to.equal(1)
    })
})

const sortedArrayWithRank = [
    {name:"Banana Cabana", rank:1, points:10},
    {name:"Grape Escape", rank:2, points:8},
    {name:"Guava Java", rank:3, points:3},
    {name:"Star Fruit Salute", rank:3, points:7},
    {name:"Blackberry Fairy", rank:5, points:1}]


const unsortedArrayDoubleSamePoints =  [ 
{ name: 'Guava Java', points: 8 },
{ name: 'Banana Cabana', points: 8 },
{ name: 'Star Fruit Salute', points: 8 },
{ name: 'Grape Escape', points: 7 },
{ name: 'Blackberry Fairy', points: 7 },
{ name: 'Magical Mango', points: 0 } ]

const unsortedArrayDoubleSamePointsWithRank = [ 
{ name: 'Guava Java', points: 8, rank: 1 },
{ name: 'Banana Cabana', points: 8, rank: 1 },
{ name: 'Star Fruit Salute', points: 8, rank: 1 },
{ name: 'Grape Escape', points: 7, rank: 4 },
{ name: 'Blackberry Fairy', points: 7, rank: 4 },
{ name: 'Magical Mango', points: 0, rank: 6 } ]

const unsortedArray = [ 
{ name: 'Banana Cabana', points: 10 },
{ name: 'Grape Escape', points: 8 },
{ name: 'Star Fruit Salute', points: 7 },
{ name: 'Guava Java', points: 7 },
{ name: 'Blackberry Fairy', points: 1 } ]

const sortedArray = [ 
{ name: 'Banana Cabana', points: 10 },
{ name: 'Grape Escape', points: 8 },
{ name: 'Guava Java', points: 7 },
{ name: 'Star Fruit Salute', points: 7 },
{ name: 'Blackberry Fairy', points: 1 } ]

