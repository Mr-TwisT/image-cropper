const determineBackgroundColor = (
  imageSrc: string,
  callback: (color: string) => void
) => {
  const img = new Image();
  img.src = imageSrc;

  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let totalLuminance = 0;

    //Dla każdego piksela oblicz jasność i dodaj do sumy
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b; //wzór na luminancję
      totalLuminance += luminance;
    }

    const avgLuminance = totalLuminance / (canvas.width * canvas.height);

    callback(avgLuminance > 128 ? 'black' : 'white');
  };
};

export default determineBackgroundColor;
