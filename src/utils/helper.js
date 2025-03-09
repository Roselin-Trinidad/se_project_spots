function renderingLoading(
  isLoading,
  button,
  defaultText = "Save",
  loadingText = "Saving...") {
 if (isLoading) {
    button.textContent = loadingText;
 } else {
    button.textContent = defaultText;
 }
};

function handleSubmit(request, evt, loadingText = "Saving...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderingLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderingLoading(false, submitButton, initialText);
    });
}

export {handleSubmit};