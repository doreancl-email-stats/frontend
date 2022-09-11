export async function findUser({ username }) {
  // This is an in memory store for users, there is no data persistence without a proper DB
  return users.find((user) => user.username === username);
}

export const userGetMe = async () => {
  const res = await fetch(`${API_URL}/links/${slug}`);
  const data: any = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return data;
};
