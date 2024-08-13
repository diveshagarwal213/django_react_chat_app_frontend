export function getLocalStorage<T>(
  key: string,
  options: {
    JsonStringify: boolean;
  } = {
    JsonStringify: true,
  }
): T | undefined {
  let data = localStorage.getItem(key);
  if (!data) return;
  if (options.JsonStringify) {
    data = JSON.parse(data);
  }
  return data as T;
}
export function UpdateLocalStorage(
  key: string,
  data: unknown,
  options: {
    JsonStringify: boolean;
  } = {
    JsonStringify: true,
  }
): void {
  let dataString;
  if (options.JsonStringify) {
    dataString = JSON.stringify(data);
  } else {
    dataString = data;
  }
  localStorage.setItem(key, dataString as string);
}
