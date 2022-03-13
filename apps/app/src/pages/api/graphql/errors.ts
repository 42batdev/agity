export enum ErrorCode {
  ID_INVALID = "ID_INVALID",
}

export const validIDPattern = new RegExp(/^([a-zA-Z0-9]+[_]*[a-zA-Z0-9]*)$/);
export function validateId(id: string | null) {
  let isValid = validIDPattern.test(id ?? "");
  if (!isValid) throw new Error(ErrorCode.ID_INVALID);

  return isValid;
}
