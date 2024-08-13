import get_axios_client from "../../lib/axios/axios.lib";
import axios from "axios";
import imageCompression from "browser-image-compression";

export async function upload_image_helper(file: File, url: string) {
  return await get_axios_client.get(url).then(async (res) => {
    const formData = new FormData();
    for (const key in res.data.fields) {
      formData.append(key, res.data.fields[key]);
    }
    //compressing file
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });
    formData.append("file", compressedFile);
    return axios
      .post(res.data.url, formData, {
        headers: { "Content-Type": "text/json" },
      })
      .then(() => true);
  });
}
