// imageUtils.js
const cropToSquareAndCompress = (file, targetSizeKB) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const maxSize = targetSizeKB * 1024;

                let width = img.width;
                let height = img.height;

                const squareSize = Math.min(width, height);

                canvas.width = squareSize;
                canvas.height = squareSize;

                const offsetX = (width - squareSize) / 2;
                const offsetY = (height - squareSize) / 2;

                ctx.drawImage(img, -offsetX, -offsetY, width, height);

                // 压缩
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

                resolve(compressedBase64);
            };
        };
    });
};

export { cropToSquareAndCompress };
