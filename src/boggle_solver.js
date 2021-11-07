//Boggle Assignment 3: Improved after review
//Submitted by Aashish Adhikari @02986124

//added comments as per the suggestion
//added more test cases

//Initializing Trie class
class Trie{
  constructor(){
    this.head = {}
    this.end = '#'  
  }

//inserting a word inside trie for faster lookups
insert(word) {       
  var length = word.length
  if (length == 0) return;
  var node = this.head
  for (var i = 0; i < length; i++) {
    var char = word[i]
    if (!(char in node)) {
      node[char] = {}
    }
    node = node[char]
  }
  node[this.end] = word
}
}  
//this will search in our trie along the path of dfs
exports.searchTrie = function() {
  for (var i = 0; i < this.rows; i++) {
    for (var j = 0; j < this.columns; j++) {
      var visited = new Array(this.rows).fill(0).map(() => new Array(this.columns).fill(false))
      this.dfs(this.trie.head, i, j, visited)
    }
  }
}

//this function appends to our set all the found valid solutions and takes cares of edge cases like empty grid, empty dict
 exports.findAllSolutions = function(grid, dictionary) {
  if (!grid.length) return []
  if (grid == null || dictionary == null) return []

  this.rows = grid.length
  this.columns = grid[0].length
  for (var i = 0; i < this.rows; i++) {
    if (grid[i].length != this.columns) return []
  }

  this.solns = new Set();

  this.rows = grid.length
  this.columns = grid[0].length
  this.directions = [-1, 0, 1] //directions to move in the grid
  this.grid = grid  //initializing grid reference inside the function

  this.trie = new Trie();  //initialising new trie object to add our words from dict
  for (const word of dictionary) {
    if (word.length > 2) this.trie.insert(word.toLowerCase())
  }

  this.searchTrie(); //searching the trie with words from dict

  return Array.from(this.solns).sort();  //return valid words
}

//checking to see if we go out of bounds of our grid
exports.isSafeToVisit = function (i, j, visited){
	return (i >= 0 && i < this.rows && j >= 0 && j < this.columns && !visited[i][j]); 
};


//traversing adjacent tiles defined within our directions
exports.traverseAdjacent = function(node, x, y, visited) {
  if (this.trie.end in node) {
    var word = node[this.trie.end]
    this.solns.add(word)
  }
  for (var i of this.directions) {
    for (var j of this.directions) {
      var xi = x + i
      var yi = y + j
      if (this.isSafeToVisit(xi, yi, visited)) {
        this.dfs(node, xi, yi, visited)
      }
    }
  }
}
//the originial dfs function that moves along the path and adds found words
exports.dfs = function(node, x, y, visited) {

  if (this.trie.end in node) {
    var found = node[this.trie.end]
    if (found.length > 2) this.solns.add(found)
  }

  if (visited[x][y]) return
  visited[x][y] = true

  var char = this.grid[x][y].toLowerCase()
  if (char.length == 1) {
    if (char in node) {
      node = node[char]
      this.traverseAdjacent(node, x, y, visited)
    }
  } else {
    var temp = node
    var i = 0
    var search = true
    while (i < char.length && search) {
      if (char[i] in temp && temp[char[i]] != '#') {
        temp = temp[char[i]]
        i++
      } else {
        search = false
      }
    }
    if (search) {
      this.traverseAdjacent(temp, x, y, visited)
    }
  }

  visited[x][y] = false  //set visited to false after moving down a path
}