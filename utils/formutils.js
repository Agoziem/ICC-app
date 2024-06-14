export const converttoformData = (data) => {
  const formData = new FormData();
  for (let key in data) {
    if (data[key] instanceof File) {
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
