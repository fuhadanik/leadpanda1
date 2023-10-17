export default function extractQueryParameters(url) {
  const queryParameters = {};
  let queryString = '';

  // Check if the URL contains a query string
  if (url.includes('?')) {
    const parts = url.split('?');
    queryString = parts[1];
  } else if (url.includes('#')) {
    const parts = url.split('#');
    const potentialQueryString = parts[parts.length - 1];
    if (potentialQueryString.includes('=')) {
      queryString = potentialQueryString;
    }
  }

  if (queryString) {
    const params = new URLSearchParams(queryString);

    params.forEach((value, key) => {
      key = key.replace("[]", ""); // Remove [] from the key
      key = key.replace(/([A-Z])/g, "_$1").toLowerCase(); // Convert to snake_case

      // Check if the key has [max] or [min]
      const isRangeParameter = key.includes("[max]") || key.includes("[min]");

      if (isRangeParameter) {
        // Extract the base key and parameter type (max or min)
        const matches = key.match(/(.*)\[(max|min)\]/);

        if (matches && matches.length === 3) {
          const baseKey = matches[1];
          const paramType = matches[2];

          if (!queryParameters[baseKey]) {
            queryParameters[baseKey] = {};
          }

          queryParameters[baseKey][paramType] = value;
        }
      } else {
        // Parse as a number if the value is numeric
        if (!isNaN(value)) {
          value = parseFloat(value);
        }

        // Change the key name if it starts with '/people?'
        if (key.startsWith('/people?')) {
          key = 'finder_view_id';
        }
   
        // Handle single numeric values
          if (queryParameters[key] === undefined) {
            queryParameters[key] = value;
          } else {
            if (!Array.isArray(queryParameters[key])) {
              queryParameters[key] = [queryParameters[key]];
            }
            queryParameters[key].push(value);
          }
      }
    });
  }


  // Convert plural keys with single values to arrays
  for (const key in queryParameters) {
    if (!Array.isArray(queryParameters[key]) && (key.endsWith('s') && !key.endsWith("_radius"))) {
      queryParameters[key] = [queryParameters[key]];
    }
  }

  // console.log(queryParameters);
  return queryParameters;
}