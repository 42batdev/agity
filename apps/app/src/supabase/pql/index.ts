export function handleSupabaseError(result) {
  const { error, ...rest } = result;
  if (error) {
    console.error("A graphql error occurred.", result);
    throw error;
  }
  return rest;
}

export function logSupabaseData(result) {
  console.log(result);
  return result;
}
