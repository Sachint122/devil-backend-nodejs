const cloudinary = require('cloudinary').v2;

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

const check = () => {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary not configured! Set CLOUDINARY_* env variables.');
  }
};

const uploadToCloudinary = async (fileBuffer, originalName, mimeType, folder = 'uploads') => {
  check();

  const b64 = Buffer.from(fileBuffer).toString('base64');
  const dataURI = `data:${mimeType};base64,${b64}`;

  const extension = originalName.includes('.') ? originalName.slice(originalName.lastIndexOf('.')) : '';
  const nameWithoutExt = originalName.includes('.') ? originalName.slice(0, originalName.lastIndexOf('.')) : originalName;
  const sanitizedName = nameWithoutExt.replace(/[^a-z0-9]/gi, '_').toLowerCase();

  const result = await cloudinary.uploader.upload(dataURI, {
    resource_type: 'raw',
    folder,
    public_id: `${Date.now()}-${sanitizedName}${extension}`,
    use_filename: true,
    unique_filename: false,
  });

  let fileUrl = result.secure_url;
  if (fileUrl.includes('/image/upload/')) {
    fileUrl = fileUrl.replace('/image/upload/', '/raw/upload/');
  }

  return { url: fileUrl, publicId: result.public_id, name: originalName };
};

const uploadImageToCloudinary = async (fileBuffer, originalName, mimeType, folder = 'uploads') => {
  check();

  const b64 = Buffer.from(fileBuffer).toString('base64');
  const dataURI = `data:${mimeType};base64,${b64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    resource_type: 'image',
    folder,
    public_id: `${Date.now()}-${originalName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`,
  });

  return { url: result.secure_url, publicId: result.public_id, name: originalName };
};

const deleteFromCloudinary = async (publicId, resourceType = 'raw') => {
  check();
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

const getCloudinary = () => {
  check();
  return cloudinary;
};

module.exports = { uploadToCloudinary, uploadImageToCloudinary, deleteFromCloudinary, getCloudinary };
