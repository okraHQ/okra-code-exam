/**
 * @file format time objects
 */

// modules
import moment from 'moment'

// constants
const defaultTimeFormat = 'DD MMM YYYY, h:mm a'

/**
 * @function convertDate
 * @description convert json stringified date to readable date object
 * @param { string } date
 * @return { string }
 */
export const convertDate = (date) => {
  return moment(date).format(defaultTimeFormat)
}
