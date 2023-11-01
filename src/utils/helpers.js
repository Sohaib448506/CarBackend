exports.handleSuccess = (res, response) => {
  // Sends error to user
  res.status(200).json({
    success: true,
    data: { ...response },
  });
};

exports.handleError = (res, error, message, code = null) => {
  res.status(code ? code : 500).json({
    success: false,
    error: { message, reason: error.message },
  });
};
