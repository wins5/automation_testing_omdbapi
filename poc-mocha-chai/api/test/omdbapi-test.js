const assert = require('chai').expect;
const page = require('../page/omdbapi-page.js');
const testCase = {
 "positive" : {
    "getMovieSearch" : "Send Request to Search Movie on OMDb API",
 },
 "negative" : {
	"noAPIKey" : "Send Request Without Input the API Key",
	"invalidAPIKey" : "Send Request With Input the Invalid API Key",
    "noKeyOfSearch" : "Send Request Without Input the Key of Search",
	"inputOneChar" : "Send Request to Search a Movie with One Character Keyword",
	"inputSymbol" : "Send Request to Search a Movie with Symbol Keyword",
	"inputRandomWord" : "Send Request to Search a Movie with Random Word Keyword",
	"noAPIKeyAndKeyword" : "Send Request Without Input the API Key and Keyword",
	"noAPIKeyAndInvalidKeyword" : "Send Request Without Input the API Key and Input Invalid Keyword",
	"capitalAPIKeyAndKeyword" : "Send Request With Capital Letters for the API Key and Keyword"
 }
}

describe(`OMDb API`, () => {
 const apiKey = '97f768b3';
 const keySearch = 'galaxy';
 const invalidAPIKey = '12345';
 const oneCharSearch = 'a';
 const symbolSearch = '`~';
 const randomSearch = 'asdfgh';
 const apiKeyCapital = '97F768B3';
 const keySearchCapital = 'GALAXY';

/* ---------- Positive Flow ---------- */

 /*
	* Name : OMDb Movie Search
    * Feature : Send Request to Search Movie on OMDb API
    * Step : 
        1. Send Request to OMDb API
        2. Fill user's API key
        3. Fill the keyword to search movie
    * Expected Result : User will get movie list based on keyword that user search
	* Actual Result : User get movie list based on keyword that user search
 */
 it(`@get ${testCase.positive.getMovieSearch}`, async() => {
  const response = await page.getOMDbMovie(apiKey, keySearch);
  assert(response.status).to.equal(200);
  assert(response.body.Response).to.equal('True');
  assert(response.body.search, 'galaxy');
  assert(response.body.search, 'Title');
  assert(response.body.search, 'Year');
  assert(response.body.search, 'imdbID');
  assert(response.body.search, 'Type');
  assert(response.body.search, 'Poster');
 }),


/* ---------- Negative Flow ---------- */

 /*
	* Name : No API Key
    * Feature : Send Request Without Input the API Key
    * Step : 
        1. Send Request to OMDb API
        2. Didn't fill user's API key
        3. Fill the keyword to search movie
    * Expected Result : User will get an error messages
	* Actual Result : User get an error messages
 */
 it(`@get ${testCase.negative.noAPIKey}`, async() => {
  const response = await page.getOMDbMovie('', keySearch);
  assert(response.status).to.equal(401, response.body.Error);
  assert(response.body.Response).to.equal('False');
  assert(response.body.Error).to.equal('No API key provided.');
 }),
 
 /*
	* Name : Invalid API Key
    * Feature : Send Request With Input the Invalid API Key
    * Step : 
        1. Send Request to OMDb API
        2. Fill an invalid API key
        3. Fill the keyword to search movie
    * Expected Result : User will get an error messages
	* Actual Result : User get an error messages
 */
  it(`@get ${testCase.negative.invalidAPIKey}`, async() => {
   const response = await page.getOMDbMovie(invalidAPIKey, keySearch);
   assert(response.status).to.equal(401, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('Invalid API key!');
  }),

 /*
	* Name : No Key of Search
    * Feature : Send Request Without Input the Key of Search
    * Step : 
        1. Send Request to OMDb API
        2. Fill user's API key
        3. Didn't fill the keyword to search movie
    * Expected Result : User will get an error messages
	* Actual Result : User get an error messages
 */
 it(`@get ${testCase.negative.noKeyOfSearch}`, async() => {
  const response = await page.getOMDbMovie(apiKey, '');
  assert(response.status).to.equal(200, response.body.Error);
  assert(response.body.Response).to.equal('False');
  assert(response.body.Error).to.equal('Something went wrong.');
 }),

 /*
	* Name : Input One Character
    * Feature : Send Request to Search a Movie with One Character Keyword
    * Step : 
        1. Send Request to OMDb API
        2. Fill user's API key
        3. Fill one character as keyword to search movie
    * Expected Result : User will display all the movies that has that character
	* Actual Result : User get an error messages that said "Too many results."
 */
 it(`@get ${testCase.negative.inputOneChar}`, async() => {
   const response = await page.getOMDbMovie(apiKey, oneCharSearch);
   assert(response.status).to.equal(200, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('Too many results.');
 }),
 
 /*
	* Name : Input Symbol
    * Feature : Send Request to Search a Movie with Symbol Keyword
    * Step : 
        1. Send Request to OMDb API
        2. Fill user's API key
        3. Fill the symbol as keyword to search movie
    * Expected Result : User will get the list of movie that contains that symbol or an error messages if there is no movie that has that symbol as Movie's detail information
	* Actual Result : User get an error messages that said "Too many results."
 */
 it(`@get ${testCase.negative.inputSymbol}`, async() => {
   const response = await page.getOMDbMovie(apiKey, symbolSearch);
   assert(response.status).to.equal(200, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('Too many results.');
 }),
 
 /*
	* Name : Input Random Word
    * Feature : Send Request to Search a Movie with Random Word Keyword
    * Step : 
        1. Send Request to OMDb API
        2. Fill user's API key
        3. Fill the random word as keyword to search movie
    * Expected Result : User will get an error messages that said movie not found
	* Actual Result : User get an error messages that said movie not found
 */
 it(`@get ${testCase.negative.inputRandomWord}`, async() => {
   const response = await page.getOMDbMovie(apiKey, randomSearch);
   assert(response.status).to.equal(200, response.body.Error);
   assert(response.body.Response).to.equal('False');
   assert(response.body.Error).to.equal('Movie not found!');
 }),
 
 /*
	* Name : No API Key and No Key of Search
    * Feature : Send Request Without Input the API Key and Keyword
    * Step : 
        1. Send Request to OMDb API
        2. Didn't fill user's API key
        3. Didn't fill the keyword to search movie
    * Expected Result : User will get an error messages about no API key and keyword
	* Actual Result : User only get an error messages about no API key
 */
 it(`@get ${testCase.negative.noAPIKeyAndKeyword}`, async() => {
  const response = await page.getOMDbMovie('', '');
  assert(response.status).to.equal(401, response.body.Error);
  assert(response.body.Response).to.equal('False');
  assert(response.body.Error).to.equal('No API key provided.');
 }),
 
 /*
	* Name : No API Key and Input Invalid Key of Search
    * Feature : Send Request Without Input the API Key and Input Invalid Keyword
    * Step : 
        1. Send Request to OMDb API
        2. Didn't fill user's API key
        3. Fill invalid keyword to search movie
    * Expected Result : User will get an error messages about no API key and invalid keyword
	* Actual Result : User only get an error messages about no API key
 */
 it(`@get ${testCase.negative.noAPIKeyAndInvalidKeyword}`, async() => {
  const response = await page.getOMDbMovie('', randomSearch);
  assert(response.status).to.equal(401, response.body.Error);
  assert(response.body.Response).to.equal('False');
  assert(response.body.Error).to.equal('No API key provided.');
 }),
 
 /*
	* Name : API Key and Key of Search are Capital Letters
    * Feature : Send Request With Capital Letters for the API Key and Keyword
    * Step : 
        1. Send Request to OMDb API
        2. Fill user's API key with capital letters
        3. Fill keyword to search movie with capital letters
    * Expected Result : User will get the same result such as when user didn't use capital letters
	* Actual Result : User get the same result such as when user didn't use capital letters
 */
 it(`@get ${testCase.negative.capitalAPIKeyAndKeyword}`, async() => {
  const response = await page.getOMDbMovie(apiKeyCapital, keySearchCapital);
  assert(response.status).to.equal(200);
  assert(response.body.Response).to.equal('True');
  assert(response.body.search, 'galaxy');
 })

}) 