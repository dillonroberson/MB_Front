import instance from ".."

export const FIND_ALL = async () => {
  let response = await instance.get('/banks')
  return response.data;
}