const ALLOWED_FILE_TYPES = {
  ".pdf": ["application/pdf"],
  ".png": ["image/png"],
  ".jpg": ["image/jpeg"],
  ".jpeg": ["image/jpeg"],
  ".docx": [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  ".xlsx": [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  ".txt": ["text/plain"],
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

module.exports = {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
};