export default function extractQueryParameters(url) {
  const queryParameters = {};
  const queryString = url.split("?")[1];

  if (queryString) {
    const params = new URLSearchParams(queryString);

    params.forEach((value, key) => {
      key = key.replace("[]", ""); // Remove [] from the key
      key = key.replace(/([A-Z])/g, "_$1").toLowerCase(); // Convert to snake_case

      // Parse as a number if the value is numeric
      if (!isNaN(value)) {
        value = parseFloat(value);
      }

      if (queryParameters[key] === undefined) {
        queryParameters[key] = value;
      } else {
        if (!Array.isArray(queryParameters[key])) {
          queryParameters[key] = [queryParameters[key]];
        }
        queryParameters[key].push(value);
      }
    });
  }

  // Convert plural keys with single values to arrays
  for (const key in queryParameters) {
    if (!Array.isArray(queryParameters[key]) && key.endsWith("s")) {
      queryParameters[key] = [queryParameters[key]];
    }
  }

  return queryParameters;
}
