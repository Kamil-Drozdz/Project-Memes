import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import watermark from '../../assets/watermark.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../hooks/useAuth';
import { withLanguage } from '../../components/HOC/withLanguage';

const GenerateMem = ({ texts }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [memeTextTop, setMemeTextTop] = useState('');
  const [fontSize, setFontSize] = useState(30);
  const [colorStyle, setColorStyle] = useState(true);
  const [memeTextBottom, setMemeTextBottom] = useState('');
  const [error, setError] = useState('');
  const { auth } = useAuth();
  const navigate = useNavigate();
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.display = imageUrl ? 'block' : 'none';
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [imageUrl]);

  const handleImageChange = (event) => {
    setError('');
    setImage(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };
  const handleMemeTextTop = (event) => {
    if (!image) {
      setError(`${texts.selectImage}`);
      return;
    }
    setMemeTextTop(event.target.value);
    drawMemeText();
  };

  const handleMemeTextBottom = (event) => {
    if (!image) {
      setError(`${texts.selectImage}`);
      return;
    }
    setMemeTextBottom(event.target.value);
    drawMemeText();
  };

  const handleColorStyleChange = () => {
    if (!image) {
      setError(`${texts.selectImage}`);
      return;
    }
    setColorStyle(!colorStyle);
    drawMemeText();
  };

  const drawMemeText = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageUrl;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    if (memeTextTop) {
      ctx.font = `${fontSize}px IMPACT`;
      ctx.fillStyle = colorStyle ? 'white' : 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.strokeStyle = colorStyle ? 'black' : 'white';
      ctx.lineWidth = 4;
      ctx.lineJoin = 'miter';
      ctx.miterLimit = 2;
      const textWidth = ctx.measureText(memeTextTop).width;
      if (textWidth < 0.9 * canvas.width) {
        ctx.strokeText(memeTextTop, canvas.width / 2, 20);
        ctx.fillText(memeTextTop, canvas.width / 2, 20);
      } else {
        setError(`${texts.errorTextLengthTop}`);
      }
    }
    if (memeTextBottom) {
      ctx.textBaseline = 'bottom';
      const textWidth = ctx.measureText(memeTextBottom).width;
      if (textWidth < 0.85 * canvas.width) {
        ctx.strokeText(memeTextBottom, canvas.width / 2, canvas.height - 20);
        ctx.fillText(memeTextBottom, canvas.width / 2, canvas.height - 20);
      } else {
        setError(`${texts.errorTextLengthBot}`);
      }
    }

    const watermarkImg = new Image();
    watermarkImg.src = watermark;
    watermarkImg.onload = () => {
      const watermarkWidth = canvas.width * 0.1;
      const watermarkHeight = canvas.height * 0.1;
      ctx.drawImage(watermarkImg, canvas.width - watermarkWidth - 0, canvas.height - watermarkHeight - 0, watermarkWidth, watermarkHeight);
    };
  };
  const handleRemoveText = () => {
    setMemeTextTop('');
    setMemeTextBottom('');
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  const handleSave = async () => {
    try {
      if (!image) {
        setError(`${texts.selectImage}`);
        return;
      }
      const dataUrl = canvasRef.current.toDataURL();
      const response = await fetch(`waiting/for/endpoint`, {
        method: 'PATCH',
        crossDomain: true,
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          method: 'PATCH'
        },
        body: JSON.stringify({ dataUrl })
      });
      if (!response.ok) {
        throw new Error(`${texts.errorSavingImage}`);
      }
      setError(`${texts.succesSavingImage}`);
      navigate.push('/generatemem');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDownload = () => {
    if (!image) {
      setError(`${texts.selectImage}`);
      return;
    }
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="flex h-[91vh] flex-col items-center justify-center pt-4 md:h-[83vh]">
      <label htmlFor="file-upload" className="mb-2 cursor-pointer rounded-lg bg-gray-900  p-2 text-lg text-white">
        <FontAwesomeIcon className="mr-4 text-orange-600" size="lg" icon={faCloudUploadAlt} />
        {texts.upload} Meme
      </label>
      <input className="hidden" id="file-upload" type="file" onChange={handleImageChange} />
      <canvas className="w-full rounded-lg object-contain md:max-h-[40vh] md:max-w-[50vw] " ref={canvasRef} />
      <img src={imageUrl} alt="Selected Meme" className="hidden" />
      {error && <p className="text-red-400">{error}</p>}
      <div className="mt-4 rounded-lg bg-gray-900  p-2">
        <div className="max-w-64 relative z-0 mb-2 mt-2">
          <input type="text" placeholder=" " className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-200 focus:border-orange-600 focus:outline-none focus:ring-0" id="floating_text_top" onChange={handleMemeTextTop} value={memeTextTop} />
          <label htmlFor="floating_text_top" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-600">
            {texts.addTextTop}
          </label>
        </div>
        <div className="max-w-64 relative z-0 mb-2 mt-4">
          <input type="text" placeholder=" " className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-200 focus:border-orange-600 focus:outline-none focus:ring-0" id="floating_text_bottom" onChange={handleMemeTextBottom} value={memeTextBottom} />
          <label htmlFor="floating_text_bottom" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-300 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-600">
            {texts.addTextBot}
          </label>
        </div>
        <label className="max-w-64 flex justify-start">
          <input type="range" className="mt-2 mb-2 h-1 appearance-none rounded-lg bg-gray-400 accent-orange-500" min="10" max="100" value={fontSize} onChange={handleFontSizeChange} />
        </label>
        <p className="text-white">
          {texts.changeFontSize} {fontSize} px
        </p>
        <label className="max-w-64 flex justify-start">
          <input type="checkbox" className="accent-orange-600" onChange={handleColorStyleChange} />
          <p className="ml-2 text-white">{texts.colorText}</p>
        </label>
        <div className="mt-4 mb-8 flex md:mb-0">
          <button className="rounded-lg bg-orange-600 p-2" onClick={handleRemoveText}>
            {texts.removeText}
          </button>
          <button className="mr-4 ml-4 rounded-lg bg-orange-600 p-2" onClick={handleSave}>
            {texts.upload}
          </button>
          <button className="rounded-lg bg-orange-600 p-2" onClick={handleDownload}>
            {texts.download}
          </button>
        </div>
      </div>
    </div>
  );
};

export default withLanguage(GenerateMem);
