export async function load({ url }) {
  const data = Object.fromEntries(
    new URLSearchParams(url.toJSON().split("?")[1])
  );
  delete data.auth_date;
  delete data.hash;
  return data;
}
