export const fetchAuth = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const token = btoa(`${username}:${password}`);
  const authorization = `Basic ${token}`;
  const headers = { Authorization: authorization };
  const { status } = await fetch("/api/auth", { headers });
  return status === 200;
};
