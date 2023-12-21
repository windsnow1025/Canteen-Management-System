/**
 * 将 Base64 编码的字符串解析为 Blob 对象
 * @param {string} base64String - Base64 编码的字符串
 * @returns {Blob} - Blob 对象
 */
function base64StringToBlob(base64String) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray]);
}

/**
 * 将 Blob 对象转换为 Data URL
 * @param {Blob} blob - Blob 对象
 * @returns {Promise<string>} - 包含 Data URL 的 Promise
 */
function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            resolve(reader.result);
        };

        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/**
 * 将 Base64 编码的字符串转换为 Data URL
 * @param {string} base64String - Base64 编码的字符串
 * @returns {Promise<string>} - 包含 Data URL 的 Promise
 */
async function base64StringToDataURL(base64String) {
    const blob = base64StringToBlob(base64String);
    return blobToDataURL(blob);
}

export default base64StringToDataURL;
