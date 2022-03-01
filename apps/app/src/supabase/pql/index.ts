export function handleSupabaseError(result) {
  const { error, ...rest } = result;
  if (error) {
    console.log(result);
    throw error;
  }
  return rest;
}

export function logSupabaseData(result) {
  console.log(result);
  return result;
}
