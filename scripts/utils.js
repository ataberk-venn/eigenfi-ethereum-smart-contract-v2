function parseArgs(requiredKeys, optionalKeys) {
  const args = process.argv.slice(2); // Skip the first two (node and script path)
  const result = {};
  const validKeys = [...requiredKeys, ...optionalKeys];

  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].slice(2); // Remove the "--"

      // Validate the key
      if (!validKeys.includes(key)) {
        console.log(
          `Invalid argument: --${key}. Allowed arguments: ${validKeys.join(
            ", "
          )}`
        );
        process.exit(1);
      }

      // Ensure the argument has a value
      const value =
        args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : null;
      if (value === null) {
        console.log(`Missing value for argument: --${key}`);
        process.exit(1);
      }

      result[key] = value;
      i++; // Skip the value as it's already processed
    } else {
      console.log(`Unexpected argument: ${args[i]}`);
      process.exit(1);
    }
  }

  // Check for missing required keys
  for (const key of requiredKeys) {
    if (!result[key]) {
      console.log(`Missing required argument: --${key}`);
      process.exit(1);
    }
  }

  return result;
}

module.exports = { parseArgs };
