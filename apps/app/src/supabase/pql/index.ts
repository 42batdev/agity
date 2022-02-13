export function handleSupabaseError({ error, ...rest }) {
  if (error) {
    console.log(error);
    throw error;
  }
  return rest;
}

export function logSupabaseData(result) {
  console.log(result);
  return result;
}
