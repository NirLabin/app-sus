export const utilService = (function () {
  return {
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    // Get JSON
    getJSON(url, errorMsg = 'Something went wrong') {
      return fetch(url).then((response) => {
        if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
        return response.json();
      });
    },
    //  Time functions
    calcDaysPassed(date1, date2) {
      return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    },
    getTime(time) {
      return `${this.padNum(time.getHours())}:${this.padNum(
        time.getMinutes()
      )}`;
    },
    // Random integer
    randomInt(max, min = 0) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    // Format Currency
    formatCur(value, currency, locale = 'en-Us') {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
      }).format(value);
    },
    // class
    hasClass(className, el) {
      return el.classList.contains(className);
    },
    // Make ID
    makeId(length = 5) {
      let txt = '';
      let possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < length; i++)
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
      return txt;
    },
    // Save to local storage
    saveToStorage(key, value) {
      localStorage.setItem(key, JSON.stringify(value) || null);
    },
    // Load from local storage
    loadFromStorage(key) {
      let data = localStorage.getItem(key);
      return data ? JSON.parse(data) : undefined;
    },

    limitedText(txt, wordLimit = 100) {
      if (txt.length <= wordLimit) return txt;
      let txtLimited = txt.slice(0, wordLimit);
      if (txt.charAt(wordLimit) === ' ') return txt.slice(0, wordLimit);
      txtLimited = txtLimited.slice(0, txtLimited.lastIndexOf(' '));
      return txtLimited;
    },
    createUserMsg(txt, type) {
      return { txt, type };
    },

    // create a random txt
    makeLorem(size = 100) {
      let words = [
        'The sky',
        'above',
        'the port',
        'was',
        'the color of television',
        'tuned',
        'to',
        'a dead channel',
        '.',
        'All',
        'this happened',
        'more or less',
        '.',
        'I',
        'had',
        'the story',
        'bit by bit',
        'from various people',
        'and',
        'as generally',
        'happens',
        'in such cases',
        'each time',
        'it',
        'was',
        'a different story',
        '.',
        'It',
        'was',
        'a pleasure',
        'to',
        'burn',
      ];
      let txt = '';
      while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
      }
      return txt;
    },
    createMsg(txt, type = 'success') {
      return { txt, type };
    },
    padNum(num, length = 2, padStr = 0) {
      return `${num}`.padStart(length, padStr);
    },
    // months:
    // 	'January, February, March, April, May, June, July, August, September, October, November, December'.split(
    // 		', '
    // 	),
    months: 'Jan, Fab, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec'.split(
      ', '
    ),
  };
})();
