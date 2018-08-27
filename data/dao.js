/**
 * @file Defines Base Class for each DAO
 * @author Vapurrmaid <vapurrmaid@gmail.com>
 * @license
 * Copyright (c) 2018 Vapurrmaid
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/** Abstract Base Class for a DAO. */
class BaseDAO {
  /**
   * @param {Object} options
   * @param {Object} options.db
   */
  constructor (options) {
    this.db = options.db
  }

  /**
   * All public (safe) Attributes of this Resource
   *
   * @returns {Array.<string>}
   */
  get publicAttributes () {
    return this.attributes.public
  }

  /**
   * All private (unsafe) Attributes of this Resource
   *
   * @returns {Array.<string>}
   */
  get privateAttributes () {
    return this.attributes.private
  }

  /**
   * All timestamp Attributes of this Resource
   *
   * @returns {Array.<string>}
   */
  get timestampAttributes () {
    return this.attributes.timestamps
  }
}

module.exports = BaseDAO
