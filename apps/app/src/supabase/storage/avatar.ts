import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";

export function generateUniqAvatarName(): string {
  return "xxxx-xxxx-xxx-xxxx".replace(/[x]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    return r.toString(16);
  });
}

export function uploadAvatarToStorage(filename, blob, callback: () => void) {
  supabaseClient.storage
    .from("avatars")
    .upload(filename, blob)
    .then((result) => {
      if (!result.error && result.data) {
        callback();
      } else {
        console.error(result);
      }
    });
}

export function removeAvatarFromStorage(filename, callback: () => void) {
  supabaseClient.storage
    .from("avatars")
    .remove([filename])
    .then((result) => {
      if (!result.error && result.data) {
        callback();
      } else {
        console.error(result);
      }
    });
}
