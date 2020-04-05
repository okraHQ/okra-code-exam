/**
 * @file Determines all the variables we will be needing for the redux store
 * The redux store promises to have only one implementation for action creators and action types
 * and reducers hence all the variables are being preset
 * All defined variables should come with a doc that represents what they do
 */

/**
 * @const - this will populate the redux store with the required actions
 * ****************************************
 * TO UPDATE THIS CONFIG VARIABLE
 * ****************************************
 * Key Represents the reference to the layer ***
 * Values could be an array or string that represents
 * all the sublayers required to be loaded
 */
const getAllTransactions = 'GET_ALL_TRANSACTIONS';

 export const actionDictionary = {
     getAllTransactions
 }