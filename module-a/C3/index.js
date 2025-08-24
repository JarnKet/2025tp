const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

// Multer storage setup
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, './uploads'),
  filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

// File filter for validation
const fileFilter = (_, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  cb(allowed.includes(file.mimetype) ? null : new Error('Invalid type'), true);
};

// Multer instance
const upload = multer({ storage, fileFilter });

// Serve static files
app.use(express.static('uploads'));

// Endpoint to upload files
app.post('/upload', upload.array('files', 10), async (req, res) => {
  try {
    const fileInfos = await Promise.all(req.files.map(async (file) => {
      if (file.mimetype.startsWith('image/')) {
        const thumbPath = `uploads/thumbnails/thumb_${file.filename}`;
        await sharp(file.path).resize(100, 100).toFile(thumbPath);
        return { filename: file.filename, thumbnail: thumbPath, size: file.size, mime: file.mimetype };
      }
    }));
    res.json({ message: 'Files uploaded successfully', files: fileInfos });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
