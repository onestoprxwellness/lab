export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const base64 = reader.result;
        resolve(base64);
      } else {
        reject('Failed to read file');
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
