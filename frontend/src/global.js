export const baseApiUrl = "http://localhost:3000";

export const userKey = "__knowhub_user";

export function showError(e) {
  let message = "Erro ao processar requisição.";
  if (e && e.response && e.response.data) {
    message = e.response.data;
  } else if (typeof e === "string") {
    message = e;
  }
  return message;
}
