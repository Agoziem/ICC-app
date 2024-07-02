export const converttoformData = (data, jsonKeys = []) => {
  const formData = new FormData();
  for (let key in data) {
    if (jsonKeys.includes(key)) {
      // Convert the specified keys to JSON strings before appending
      formData.append(key, JSON.stringify(data[key]));
    } else if (data[key] instanceof File) {
      formData.append(key, data[key], data[key].name);
    } else {
      if (data[key] === null) {
        formData.append(key, "");
      } else {
        formData.append(key, data[key]);
      }
    }
  }
  return formData;
};

