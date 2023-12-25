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

                let width = img.width;
                let height = img.height;

                const squareSize = Math.min(width, height);

                canvas.width = squareSize;
                canvas.height = squareSize;

                const offsetX = (width - squareSize) / 2;
                const offsetY = (height - squareSize) / 2;

                ctx.drawImage(img, -offsetX, -offsetY, width, height);

                // 压缩
                let quality = 1;
                let compressedBase64 = canvas.toDataURL('image/jpeg', quality);

                // 限制最大大小
                const maxSize = targetSizeKB * 1024;

                // 如果图片大小超过最大限制，调整 quality
                if (compressedBase64.length > maxSize) {
                    quality = maxSize / compressedBase64.length;
                }
                // 在此时，compressedBase64 包含了符合 maxSize 的压缩图像数据

                compressedBase64 = canvas.toDataURL('image/jpeg', quality).split(',')[1];

                resolve(compressedBase64);
            };
        };
    });
};

export { cropToSquareAndCompress };
