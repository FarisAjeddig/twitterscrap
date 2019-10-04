// https://www.udemy.com/course/scrape-websites-phantomjs-casperjs/learn/lecture/4589854#overview

var casper = require('casper').create(
  {
  verbose: true,
  logLevel: 'error',
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
  }
);

var email = 'faris.ajeddig@diese.org'; //Email Twitter Account
var auth = 'packetAI'; //Password
var searchKey = 'bnp';

casper.start('https://twitter.com/', function(){
  this.waitForSelector('form.js-front-signin');
  this.echo(this.getTitle());
});

// Fill the login form
casper.then(function(){
  this.fillSelectors('form.js-front-signin',{
    'input[name="session[username_or_email]"]': email,
    'input[name="session[password]"]': auth
  }, true);
})

// Confirm the login
casper.then(function(){
  console.log('Authentification ok, new location is ' + this.getCurrentUrl());
});

//Fill the search form
casper.then(function(){
  this.fillSelectors('form[role="search"]', {
    'input[aria-label="Seach query"]': searchKey
  }, true);
})

// Confirm the first search
casper.then(function(){
  console.log('Search ok, new location is ' + this.getCurrentUrl());
});

// Click on "..." just right to the form.
casper.then(function() {
    this.click('div div div div div div div div svg.r-13gxpu9 g path');
});

// Click on "advanced search" in the list.
casper.then(function() {
    this.click('a[href="/search-advanced"]');
});

// Search result with both searchKey (BNP in the example) and a key world (bug in the example)
casper.then(function(){
  this.sendKeys('input[name=allOfTheseWords]', searchKey + ' bug').submit();
})

//Run the script
casper.run()
