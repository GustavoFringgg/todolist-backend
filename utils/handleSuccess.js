const handleSuccess = (res, message, data) => {
  res
    .status(200)
    .send({
      status: true,
      message,
      data,
    })
    .end();
};

module.exports = handleSuccess;
