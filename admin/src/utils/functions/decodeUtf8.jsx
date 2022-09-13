const decodeUtf8 = (s) => {
  return decodeURIComponent(escape(s));
}

export default decodeUtf8