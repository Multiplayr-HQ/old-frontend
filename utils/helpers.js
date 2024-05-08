import NumberFormat from 'react-number-format';
import countryList from 'react-select-country-list';


function getCountryList() {

    const options = countryList().getData();
    return options;
}


function MPNumberFormat({ value, currency }) {

  if (typeof value === 'string' || value instanceof String) {
      const vArr = value.split(" ");
      if (vArr.includes('States') || vArr.includes('states')) {
        currency = '$';
        value = vArr[0];
      } else if (vArr.includes('Euro') || vArr.includes('euro')) {
        currency = '€';
        value = vArr[0];
      } else if (vArr.includes('Korean') || vArr.includes('won')) {
        currency = '₩';
        value = vArr[0];
      } else if (vArr.includes('Yen') || vArr.includes('yen')) {
        currency = '¥ Yen';
        value = vArr[0];
      } else if (vArr.includes('Yuan') || vArr.includes('yuan')) {
        currency = '¥ Yuan';
        value = vArr[0];
      } else if (vArr.includes('Rupees') || vArr.includes('Rs') || vArr.includes('INR')) {
        currency = 'Rs';
        value = vArr[0];
      }
  }

  return (
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      prefix={currency}
      renderText={(formattedValue) => <span> {formattedValue} </span>}
    />
  );
}

function getCookieValue(key, decode = false) {
  if (!process.browser) {
    return;
  }

  /* eslint-disable no-useless-escape */
  const re = new RegExp(
    '(?:(?:^|.*;)\\s*' +
      encodeURIComponent(key).replace(/[\-.+*]/g, '\\$&') +
      '\\s*\\=\\s*([^;]*).*$)|^.*$'
  );
  /* eslint-enable no-useless-escape */
  const value = global.document.cookie.replace(re, ' $1 ');
  if (decode) {
    return decodeURIComponent(value);
  }

  return value;
}

function deleteCookie(cname) {
  document.cookie =
    cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; ';
}

// Cookie Set Value Fn
function setCookieValue(key, value, seconds, path, encode = false) {
  const now = new Date();
  const time = now.getTime();
  const expireTime = time + seconds * 1e3;
  now.setTime(expireTime);
  if (encode) {
    global.document.cookie =
      encodeURIComponent(key) +
      '=' +
      encodeURIComponent(value) +
      ';path=' +
      path;
    return;
  }

  global.document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
    value
  )};expires=${now.toGMTString()};path=${path};`;
}

export { setCookieValue, getCookieValue, deleteCookie, MPNumberFormat, getCountryList};
