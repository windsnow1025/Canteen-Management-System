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
                let compressedBase64 = canvas.toDataURL('image/jpeg', quality).split(',')[1];

                // 限制最大大小
                const maxSize = targetSizeKB * 1024;
                while (compressedBase64.length > maxSize && quality > 0.1) {
                    // 根据需要调整质量或其他逻辑
                    quality -= 0.1;
                    compressedBase64 = canvas.toDataURL('image/jpeg', quality).split(',')[1];
                }

                resolve(compressedBase64);
            };
        };
    });
};

export { cropToSquareAndCompress };
